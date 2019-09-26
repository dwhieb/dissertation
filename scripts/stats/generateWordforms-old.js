// IMPORTS

import { compare }   from '../utilities/index.js';
import csvStringify  from 'csv-stringify';
import path          from 'path';
import { promisify } from 'util';

const json2csv = promisify(csvStringify);

// CONSTANTS

/**
 * Options for the CSV stringifier
 * @type {Object}
 */
const csvOptions = {
  delimiter: `\t`,
  header:    true,
};

// METHODS

/**
 * Accepts a Map of items to their frequencies and converts it to a JSON array sorted by frequency
 * @param  {Map}   map A Map of items to their frequencies
 * @return {Array}     Returns an array of entries (array of arrays)
 */
function convertFrequencies(map) {
  return [...map.entries()]
  .sort(([wordA, freqA], [wordB, freqB]) => compare(freqB, freqA) || compare(wordA, wordB));
}

// MAIN

export default async function generateWordforms(dataDir, outputDir) {

  const textSizes           = new Map;
  const wordformFrequencies = new Map;

  await processDir(dataDir, filePath => processFile(filePath, wordformFrequencies, textSizes), ignore);

  // corpus size
  const corpusSize = Array.from(textSizes.values()).reduce((sum, size) => sum + size, 0);
  console.info(`Size of Corpus: ${corpusSize.toLocaleString()} tokens`);

  // the proportion of the corpus that each text constitutes
  const textProportions = Object.fromEntries(Array.from(textSizes.entries())
    .map(([text, size]) => [text, size / corpusSize]));

  // text-sizes.tsv
  const textSizesColumns = [`text`, `tokens`];
  const textSizesOptions = Object.assign({ columns: textSizesColumns }, csvOptions);
  const textSizesTSV     = await json2csv(convertFrequencies(textSizes), textSizesOptions);
  await writeFile(path.join(outputDir, `text-sizes.tsv`), textSizesTSV, `utf8`);

  // wordforms.tsv
  const wordformsColumns = [`wordform`, `frequency`];
  const wordformsOptions = Object.assign({ columns: wordformsColumns }, csvOptions);
  const wordformsTSV     = await json2csv(convertFrequencies(wordformFrequencies), wordformsOptions);
  await writeFile(path.join(outputDir, `wordforms.tsv`), wordformsTSV, `utf8`);


}
