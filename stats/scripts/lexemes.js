/**
 * This script calculates the raw frequencies and corpus dispersion (measured as Deviation of Proportions (DP))
 * for all the lexemes in a DLx JSON corpus. Relies on the word.stem field to assign a word to its lexeme.
 */

/* eslint-disable
  max-statements,
*/

import csvStringify  from 'csv-stringify';
import fs            from 'fs-extra';
import path          from 'path';
import processDir    from '../../scripts/utilities/processDir.js';
import ProgressBar   from 'progress';
import { promisify } from 'util';

const {
  readJSON,
  writeFile,
} = fs;

const json2csv = promisify(csvStringify);

/**
 * A generic comparator function, for use with the sort method. Works with Strings and Numbers.
 * @param  {Any}     a First item to be compared
 * @param  {Any}     b Second item to be compared
 * @return {Integer}   Returns 1 if the first item is greater, -1 if the first item is lesser, and 0 if the two items are the same.
 * @example
 * items.sort((a, b) => compare(a.year, b.year) || compare(a.title, b.title));
 */
function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return +1;
  return 0;
}

/**
 * Increments the frequency of a word token in a frequency Map
 * @param  {String} lexeme
 * @param  {Map}    frequencies A Map of wordforms to their frequencies
 */
function countToken(lexeme, frequencies) {

  const wordform = lexeme.toLowerCase();

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
 * Calculates the raw frequency of each lexeme in a DLx corpus, using the "stem"
 * property to group wordforms into lexemes.
 * @param  {String} dataDir      The path to the directory of DLx JSON files. May have subdirectories.
 * @param  {String} [outputPath] The path to the file where you would like the list of lexemes outputted. If omitted, logs the list of lexemes to the console instead.
 * @return {Promise}
 */
export default async function getLexemeFrequencies(dataDir, outputPath) {

  // VARIABLES

  const corpusLexemes = new Map;
  let   corpusSize    = 0;
  const texts         = new Map;

  // METHODS

  const processFile = async filePath => {

    const textLexemes = new Map;
    let   textSize    = 0;

    const { utterances } = await readJSON(filePath);

    utterances.forEach(({ words }) => {

      if (!words) return;

      corpusSize += words.length;
      textSize   += words.length;

      words.forEach(word => {
        countToken(word.analysis, textLexemes);
        countToken(word.analysis, corpusLexemes);
      });

    });

    const filename = path.basename(filePath, `.json`);

    texts.set(filename, {
      lexemes: textLexemes,
      size:    textSize,
    });

  };

  // calculate raw frequencies of lexemes

  console.info(`Calculating raw frequencies of lexemes`);

  await processDir(dataDir, processFile, ignore);

  // calculate size of corpus

  console.info(`\nSize of Corpus: ${corpusSize.toLocaleString()} tokens\n`);

  // calculate relative text sizes

  texts.forEach(text => {
    // eslint-disable-next-line no-param-reassign
    text.relativeSize = text.size / corpusSize;
  });

  // calculate corpus dispersions

  console.info(`Calculating corpus dispersions of lexemes`);

  const progressBar = new ProgressBar(`:bar :current :total :percent :eta`, { total: corpusLexemes.size });

  for (const [lexeme, corpusFrequency] of corpusLexemes) {

    const textFrequencies = new Map;

    // get raw and relative frequencies of the lexeme in each text
    for (const [text, { lexemes }] of texts) {

      const textFrequency = lexemes.get(lexeme) || 0;

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
    .reduce((diffs, [text, { relativeSize: expectedFrequency }]) => {

      const { relative: actualFrequency } = textFrequencies.get(text);
      const diff = Math.abs(expectedFrequency - actualFrequency);

      return diffs.set(text, diff);

    }, new Map);

    // get sum of the absolute differences calculated above
    const sumDifferences = Array.from(differences.values())
    .reduce((sum, count) => sum + count, 0);

    // get measure of corpus dispersion (Deviation of Proportions (DP))
    const dispersion = sumDifferences / 2;

    corpusLexemes.set(lexeme, {
      dispersion,
      frequency: corpusFrequency,
    });

    progressBar.tick();

  }

  const tableData = Array
  .from(corpusLexemes.entries())
  .map(([lexeme, { dispersion, frequency }]) => [lexeme, dispersion, frequency])
  .sort(([, a], [, b]) => compare(b, a));

  if (!outputPath) {
    return console.info(tableData
      .map(([lexeme, dispersion, frequency]) => `${lexeme}:\t${frequency} ${dispersion}`)
      .join(`\n`));
  }

  const csvOptions = {
    columns: [
      `lexeme`,
      `frequency`,
      `dispersion`,
    ],
    delimiter: `\t`,
    header:    true,
  };

  const tsv = await json2csv(tableData, csvOptions);
  await writeFile(outputPath, tsv, `utf8`);

}
