/**
 * This script calculates the raw frequencies and corpus dispersion (measured as Deviation of Proportions (DP))
 * for all wordforms or lexemes in a DLx JSON corpus. Relies on the word.stem field to assign a word to its lexeme.
 *
 * NB: In many places in this script, "lexeme" is a cover term for lexeme or wordform, depending on which option
 * the user chooses to run the script with.
 */

/* eslint-disable
  default-case,
  max-statements,
  no-param-reassign,
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
 * Increments the frequency of an item in a frequency Map
 * @param  {String} item
 * @param  {Map}    frequencies A Map of items to their frequencies
 */
function countToken(item, frequencies) {

  const wordform = item.toLowerCase();

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
 * Calculates the raw frequency and corpus dispersion of each wordform or lexeme in a DLx corpus.
 * @param  {String} dataDir                 The path to the directory of DLx JSON files. May have subdirectories.
 * @param  {Object} [options={}]            The options hash
 * @param  {String} [options.unit=`lexeme`] The type of linguistic unit calculate statistics for. Values may be either `root`, `lexeme` or `wordform`. Defaults to `lexeme`.
 * @param  {String} [options.outputPath]    The path to the file where you would like the statistical results outputted. If omitted, logs the list to the console instead.
 * @param  {String} [options.wordFilter]    This function should accept a Word object as its argument, and return true if the word should be included in the wordform/lexemes list, false if it should not.
 * @return {Promise}
 */
export default async function getStatistics(dataDir, { outputPath, unit = `lexeme`, wordFilter } = {}) {

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

      words
      .filter(wordFilter)
      .forEach(word => {

        let prop;

        switch (unit) {
          case `wordform`: prop = `transcription`; break;
          case `lexeme`: prop = `stem`; break;
          case `root`: prop = `root`; break;
        }

        if (!word[prop]) return;
        countToken(word[prop], textLexemes);
        countToken(word[prop], corpusLexemes);

      });

    });

    const filename = path.basename(filePath, `.json`);

    texts.set(filename, {
      lexemes: textLexemes,
      size:    textSize,
    });

  };

  // calculate raw frequencies of lexemes

  console.info(`Calculating raw frequencies`);

  await processDir(dataDir, processFile, ignore);

  // calculate size of corpus

  console.info(`\nSize of Corpus: ${corpusSize.toLocaleString()} tokens\n`);

  // calculate relative text sizes

  texts.forEach(text => {
    text.relativeSize = text.size / corpusSize;
  });

  // calculate corpus dispersions

  console.info(`Calculating corpus dispersions`);

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
  .map(([lexeme, { dispersion, frequency }]) => [lexeme, frequency, dispersion])
  .sort(([,, a], [,, b]) => compare(a, b));

  if (!outputPath) {
    return console.info(tableData
      .map(([lexeme, frequency, dispersion]) => `${lexeme}:\t${frequency} ${dispersion}`)
      .join(`\n`));
  }

  const csvOptions = {
    columns: [
      unit,
      `frequency`,
      `dispersion`,
    ],
    delimiter: `\t`,
    header:    true,
  };

  const tsv = await json2csv(tableData, csvOptions);
  await writeFile(outputPath, tsv, `utf8`);

}
