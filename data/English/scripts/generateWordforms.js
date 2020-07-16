/**
 * This is a slightly modified form of the stats/scripts/getStatistics.js script,
 * which excludes some unwanted wordforms from the results.
 */

/* eslint-disable
  max-statements,
*/

import csvStringify  from 'csv-stringify';
import fs            from 'fs-extra';
import path          from 'path';
import processDir    from '../../../scripts/utilities/processDir.js';
import ProgressBar   from 'progress';
import { promisify } from 'util';
import tokenFilter   from './tokenFilter.js';

const {
  readJSON,
  writeFile,
} = fs;

const json2csv = promisify(csvStringify);

/**
 * Increments the frequency of a word token in a frequency Map
 * @param  {String} token       The word token
 * @param  {Map}    frequencies A Map of wordforms to their frequencies
 */
function countToken(token, frequencies) {

  const wordform = token.toLowerCase();

  if (frequencies.has(wordform)) frequencies.set(wordform, frequencies.get(wordform) + 1);
  else frequencies.set(wordform, 1);

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

  const processFile = async filePath => {

    const textWordforms = new Map;
    let   textSize      = 0;

    const { utterances } = await readJSON(filePath);

    utterances.forEach(({ words }) => {

      corpusSize += words.length;
      textSize   += words.length;

      words
      .filter(tokenFilter)
      .forEach(word => {
        countToken(word.transcription, textWordforms);
        countToken(word.transcription, corpusWordforms);
      });

    });

    const filename = path.basename(filePath, `.json`);

    texts.set(filename, {
      numTokens: textSize,
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
    info.relativeSize = info.numTokens / corpusSize;
  });

  // CORPUS DISPERSIONS

  console.info(`Calculating corpus dispersions`);

  const progressBar = new ProgressBar(`:bar :current :total :percent :eta`, { total: corpusWordforms.size });

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
