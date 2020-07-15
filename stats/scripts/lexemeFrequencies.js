import csvStringify   from 'csv-stringify';
import findAndReplace from '../../scripts/utilities/findAndReplace.js';
import fs             from 'fs-extra';
import { promisify }  from 'util';

const json2csv      = promisify(csvStringify);
const { writeFile } = fs;

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
 * Calculates the raw frequency of each lexeme in a DLx corpus, using the "stem"
 * property to group wordforms into lexemes.
 * @param  {String} dataDir      The path to the directory of DLx JSON files. May have subdirectories.
 * @param  {String} [outputPath] The path to the file where you would like the list of lexemes outputted. If omitted, logs the list of lexemes to the console instead.
 * @return {Promise}
 */
export default async function getLexemeFrequencies(dataDir, outputPath) {

  console.info(`Calculating raw frequencies of lexemes`);

  const options     = { searchOnly: true };
  const frequencies = new Map;

  await findAndReplace(dataDir, ({ words }) => {

    if (!words) return;

    words.forEach(word => {
      if (!word.stem) return;
      countToken(word.stem, frequencies);
    });

  }, options);

  const tableData = Array
  .from(frequencies.entries())
  .sort(([, a], [, b]) => compare(b, a));

  if (!outputPath) {
    return console.info(tableData
      .map(([lexeme, frequency]) => `${lexeme}:\t${frequency}`)
      .join(`\n`));
  }

  const csvOptions = {
    columns: [
      `lexeme`,
      `frequency`,
    ],
    delimiter: `\t`,
    header:    true,
  };

  const tsv = await json2csv(tableData, csvOptions);
  await writeFile(outputPath, tsv, `utf8`);

}
