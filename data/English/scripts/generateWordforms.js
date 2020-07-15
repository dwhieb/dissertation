/* eslint-disable
  max-statements,
*/

import csvStringify      from 'csv-stringify';
import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import path              from 'path';
import processDir        from '../../../scripts/utilities/processDir.js';
import ProgressBar       from 'progress';
import { promisify }     from 'util';
import YAML              from 'yaml';

const {
  readFile,
  readJSON,
  writeFile,
} = fs;

const badCharsRegExp = /[^A-Za-z]/u;
const currentDir     = path.dirname(fileURLToPath(import.meta.url));
const json2csv       = promisify(csvStringify);

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
 * Ignore method which tells recursive-readdir to ignore any non-JSON files
 */
function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

/**
 * Generates a tab-delimited file of raw frequencies and dispersions for each wordform in the corpus
 * @param  {String}   dataDir    The directory of JSON files to calculate frequencies for
 * @param  {String}   outputPath The path to the file to generate
 * @return {Promise}
 */
export default async function generateWordforms(dataDir, outputPath) {

  console.info(`Calculating raw frequencies of wordforms`);

  const corpusWordforms = new Map;
  const texts           = new Map;
  let   corpusSize      = 0;

  const nonLexicalTagsPath = path.join(currentDir, `./constants/nonLexicalTags.yml`);
  const nonLexicalTagsYAML = await readFile(nonLexicalTagsPath, `utf8`);
  const nonLexicalTags     = YAML.parse(nonLexicalTagsYAML);

  const blacklistPath      = path.join(currentDir, `./constants/blacklist.yml`);
  const blacklistYAML      = await readFile(blacklistPath, `utf8`);
  const blacklist          = YAML.parse(blacklistYAML);

  /**
   * A filter function which accepts a DLx Word Token object for a word in English,
   * and returns true if the token should be included in the wordforms list,
   * false otherwise.
   * @param  {Word}    word A DLx Word Token object for an English word token
   * @return {Boolean}
   */
  const isGoodToken = ({ tags: { Penn }, transcription }) => {
    if (blacklist.includes(transcription)) return false;
    if (hasBadChars(transcription)) return false;
    if (nonLexicalTags.includes(Penn)) return false;
    return true;
  };

  const processFile = async filePath => {

    const textWordforms = new Map;
    let   textSize      = 0;

    const { utterances } = await readJSON(filePath);

    utterances.forEach(({ words }) => {

      corpusSize += words.length;
      textSize   += words.length;

      words
      .filter(isGoodToken)
      .forEach(word => {
        countToken(word, textWordforms);
        countToken(word, corpusWordforms);
      });

    });

    const filename = path.basename(filePath, `.json`);

    texts.set(filename, {
      rawSize:   textSize,
      wordforms: textWordforms,
    });

  };

  // RAW FREQUENCIES OF WORDFORMS

  await processDir(dataDir, processFile, ignore);

  // CORPUS SIZE

  console.info(`\nSize of Corpus: ${corpusSize.toLocaleString()} words\n`);

  // RELATIVE TEXT SIZES

  texts.forEach(info => {
    // eslint-disable-next-line no-param-reassign
    info.relativeSize = info.rawSize / corpusSize;
  });

  // CORPUS DISPERSIONS

  console.info(`Calculating corpus dispersions`);

  const progressBar = new ProgressBar(`:bar`, { total: corpusWordforms.size });

  for (const [wordform, corpusFrequency] of corpusWordforms) {

    const textFrequencies = new Map;

    // get raw and relative frequencies of the wordform in each text
    for (const [text, { wordforms }] of texts) {

      const textFrequency = wordforms.get(wordform) || 0;

      textFrequencies.set(text, {
        raw:      textFrequency,
        relative: textFrequency / corpusFrequency,
      });

    }

    // get absolute difference between
    // expected relative frequency of the wordform in each text
    // and
    // actual relative frequency of the wordform in each text
    const differences = Array.from(texts.entries())
    .reduce((diffs, [text, { relativeSize: expectedFreq }]) => {

      const { relative: actualFreq } = textFrequencies.get(text);
      const diff = Math.abs(expectedFreq - actualFreq);

      return diffs.set(text, diff);

    }, new Map);

    // get sum of the absolute differences calculated above
    const sumDifferences = Array.from(differences.values())
    .reduce((sum, count) => sum + count, 0);

    // get measure of corpus dispersion (Deviation of Proportions (DP))
    const dispersion = sumDifferences / 2;

    corpusWordforms.set(wordform, {
      dispersion,
      frequency: corpusFrequency,
    });

    progressBar.tick();

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

  // generate wordforms.tsv
  const tableData = Array.from(corpusWordforms.entries())
  .map(([wordform, { dispersion, frequency }]) => [wordform, frequency, dispersion]);

  const wordformsTSV = await json2csv(tableData, csvOptions);
  await writeFile(outputPath, wordformsTSV, `utf8`);

}
