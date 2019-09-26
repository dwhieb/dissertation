// IMPORTS

import csvStringify  from 'csv-stringify';
import fs            from 'fs';
import path          from 'path';
import { promisify } from 'util';

import {
  compare,
  processDir,
} from '../utilities/index.js';

const json2csv = promisify(csvStringify);

const {
  readFile,
  writeFile,
} = fs.promises;

/**
 * Options for the CSV stringifier
 * @type {Object}
 */
const csvOptions = {
  delimiter: `\t`,
  header:    true,
};

/**
 * Accepts a Map of items to their frequencies and converts it to a JSON array sorted by frequency
 * @param  {Map}   map A Map of items to their frequencies
 * @return {Array}     Returns an array of entries (array of arrays)
 */
function convertFrequencies(map) {
  return [...map.entries()]
  .sort(([wordA, freqA], [wordB, freqB]) => compare(freqB, freqA) || compare(wordA, wordB));
}

/**
 * Counts the word tokens in an utterance and adds them to the frequencies Map
 * @param  {Utterance} utterance   A DLx Utterance object
 * @param  {Map}       frequencies A Map of wordforms to their frequencies
 * @return {[type]}             [description]
 */
function countUtterance({ words }, frequencies) {
  words.forEach(({ transcription }) => {

    const wordform = transcription.toLowerCase();

    if (frequencies.has(wordform)) frequencies.set(wordform, frequencies.get(wordform) + 1);
    else frequencies.set(wordform, 1);

  });
}

/**
 * Ignore function for recursive-readdir
 */
function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

/**
 * Counts the tokens in an individual text and adds them to the provided frequencies Map. Affects the original Map.
 * @param  {String}  filePath    The path to the file to count tokens in
 * @param  {Map}     frequencies A Map of wordforms to frequencies. Affects the original Map.
 * @return {Promise}
 */
async function processFile(filePath, frequencies, textSizes) {

  const json           = await readFile(filePath, `utf8`);
  const { utterances } = JSON.parse(json);
  const textSize       = utterances.reduce((sum, { words }) => sum + words.length, 0);
  const filename       = path.basename(filePath, `.json`);

  textSizes.set(filename, textSize);

  utterances.map(u => countUtterance(u, frequencies));

}

// MAIN

export default async function generateWordforms(dataDir, outputDir) {

  const frequencies = new Map;
  const textSizes   = new Map;

  await processDir(dataDir, filePath => processFile(filePath, frequencies, textSizes), ignore);

  // text-sizes.tsv
  const textSizesColumns = [`text`, `tokens`];
  const textSizesOptions = Object.assign({ columns: textSizesColumns }, csvOptions);
  const textSizesTSV     = await json2csv(convertFrequencies(textSizes), textSizesOptions);
  await writeFile(path.join(outputDir, `text-sizes.tsv`), textSizesTSV, `utf8`);

  // wordforms.tsv
  const wordformsColumns = [`wordform`, `frequency`];
  const wordformsOptions = Object.assign({ columns: wordformsColumns }, csvOptions);
  const wordformsTSV     = await json2csv(convertFrequencies(frequencies), wordformsOptions);
  await writeFile(path.join(outputDir, `wordforms.tsv`), wordformsTSV, `utf8`);


}
