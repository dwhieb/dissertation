/* eslint-disable
  max-statements,
  no-await-in-loop,
*/

// IMPORTS

import csvStringify      from 'csv-stringify';
import { fileURLToPath } from 'url';
import fs                from 'fs';
import path              from 'path';
import ProgressBar       from 'progress';
import { promisify }     from 'util';
import recurse           from 'recursive-readdir';
import YAML              from 'yaml';

const {
  readFile,
  writeFile,
} = fs.promises;

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const json2csv = promisify(csvStringify);

// CONSTANTS

const badCharsRegExp     = /[^A-Za-z]/u;

const nonLexicalTagsPath = path.join(currentDir, `./constants/nonLexicalTags.yml`);
const nonLexicalTagsYAML = fs.readFileSync(nonLexicalTagsPath, `utf8`); // eslint-disable-line no-sync
const nonLexicalTags     = YAML.parse(nonLexicalTagsYAML);

const blacklistPath      = path.join(currentDir, `./constants/blacklist.yml`);
const blacklistYAML      = fs.readFileSync(blacklistPath, `utf8`); // eslint-disable-line no-sync
const blacklist          = YAML.parse(blacklistYAML);

// METHODS

/**
 * Increments the frequency of a word token in a frequency Map
 * @param  {Object} word        A DLx Word Token object
 * @param  {Map}    frequencies A Map of wordforms to their frequencies
 */
function countToken({ transcription }, frequencies) {

  const wordform = transcription.toLowerCase();

  if (frequencies.has(wordform)) frequencies.set(wordform, frequencies.get(wordform) + 1);
  else frequencies.set(wordform, 1);

}

function hasBadChars(string) {
  return badCharsRegExp.test(string);
}

/**
 * Ignore method which tells recursive-readdir to ignore any non-DLx files
 */
function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  if (filePath.endsWith(`_wordforms.json`)) return true;
  return path.extname(filePath) !== `.json`;
}

/**
 * A filter function which accepts a DLx Word Token object for a word in English,
 * and returns true if the token should be included in the wordforms list,
 * false otherwise.
 * @param  {Word}    word A DLx Word Token object for an English word token
 * @return {Boolean}
 */
function isGoodToken({ tags: { Penn }, transcription }) {
  if (blacklist.includes(transcription)) return false;
  if (hasBadChars(transcription)) return false;
  if (nonLexicalTags.includes(Penn)) return false;
  return true;
}

/**
 * Generates a tab-delimited file of raw frequencies and dispersions for each wordform in the corpus
 * @param  {String}   dataDir        The directory of JSON files to calculate frequencies for
 * @param  {String}   outputPath     The path to the file to generate
 * @param  {Function} filterFunction A filter function which accepts a DLx Word Token, and returns true to keep the word, false otherwise. Excluded words will be included in frequency counts, but not the final list of generated wordforms.
 * @return {Promise}
 */
export default async function generateWordforms(dataDir, outputPath) {

  let   corpusSize      = 0;
  const corpusWordforms = new Map;
  const texts           = new Map;

  const dlxFiles               = await recurse(dataDir, [ignore]);
  const frequenciesProgressBar = new ProgressBar(`:bar`, { total: dlxFiles.length });

  // RAW WORDFORM FREQUENCIES

  console.info(`Calculating raw frequencies`);

  for (const filePath of dlxFiles) {

    const json           = await readFile(filePath, `utf8`);
    const { utterances } = JSON.parse(json);
    const textWordforms  = new Map;
    let   textSize       = 0;

    // increment text and corpus counts for each token in the text
    // filter out unwanted data (using provided filter function)
    // add remaining data to corpus and text wordforms Maps
    // eslint-disable-next-line no-loop-func
    utterances.forEach(({ words }) => {

      corpusSize += words.length;
      textSize   += words.length;

      words
      .filter(isGoodToken)
      .forEach(w => {
        countToken(w, textWordforms);
        countToken(w, corpusWordforms);
      });

    });

    const filename = path.basename(filePath, `.json`);

    texts.set(filename, {
      rawSize:   textSize,
      wordforms: textWordforms,
    });

    frequenciesProgressBar.tick();

  }


  // CORPUS SIZE

  console.info(`\nSize of Corpus: ${corpusSize.toLocaleString()} words\n`);

  // RELATIVE TEXT SIZES

  texts.forEach(info => {
    // eslint-disable-next-line no-param-reassign
    info.relativeSize = info.rawSize / corpusSize;
  });


  // DISPERSIONS

  console.info(`Calculating corpus dispersions`);

  const dispersionsProgressBar = new ProgressBar(`:bar`, { total: corpusWordforms.size });

  for (const [wordform, corpusFrequency] of corpusWordforms) {

    const textFrequencies = new Map;

    // raw and relative frequencies of the wordform in each text
    for (const [text, { wordforms }] of texts) {

      const textFrequency = wordforms.get(wordform) || 0;

      textFrequencies.set(text, {
        raw:      textFrequency,
        relative: textFrequency / corpusFrequency,
      });

    }

    // absolute difference between
    // expected relative frequency of the wordform in each text
    // and
    // actual relative frequency of the wordform in each text
    const differences = Array.from(texts.entries())
    .reduce((diffs, [text, { relativeSize: expectedFreq }]) => {

      const { relative: actualFreq } = textFrequencies.get(text);
      const diff = Math.abs(expectedFreq - actualFreq);

      return diffs.set(text, diff);

    }, new Map);

    // sum of the absolute differences calculated above
    const sumDifferences = Array.from(differences.values())
    .reduce((sum, count) => sum + count, 0);

    // measure of corpus dispersion (Deviation of Proportions (DP))
    const dispersion = sumDifferences / 2;

    corpusWordforms.set(wordform, {
      dispersion,
      frequency: corpusFrequency,
    });

    dispersionsProgressBar.tick();

  }

  const csvOptions = {
    columns: [
      `wordform`,
      `frequency`,
      `dispersion`,
    ],
    delimiter: `\t`,
    header:    true,
  };

  // wordforms.tsv
  const tableData = Array.from(corpusWordforms.entries())
  .map(([wordform, { dispersion, frequency }]) => [wordform, frequency, dispersion]);

  const wordformsTSV = await json2csv(tableData, csvOptions);
  await writeFile(outputPath, wordformsTSV, `utf8`);

}
