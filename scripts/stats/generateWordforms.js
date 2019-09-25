// IMPORTS

import csvStringify  from 'csv-stringify';
import fs            from 'fs';
import JSONStream    from 'JSONStream';
import path          from 'path';
import { promisify } from 'util';

import {
  compare,
  processDir,
} from '../utilities/index.js';

const json2csv      = promisify(csvStringify);
const { writeFile } = fs.promises;

// VARIABLES

/**
 * Column names for the generated CSV file
 * @type {Array}
 */
const columns = [
  `wordform`,
  `frequency`,
];

/**
 * Options for the CSV stringifier
 * @type {Object}
 */
const csvOptions = {
  columns,
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

/**
 * Accepts a DLx Word Token object and a Map of wordform frequencies and increments the frequency in the Map for that wordform
 * @param  {Object} word        A DLx Word Token object
 * @param  {Map}    frequencies A map of wordforms to frequencies
 */
function countToken({ transcription }, frequencies) {

  const wordform = transcription.toLowerCase();

  if (frequencies.has(wordform)) frequencies.set(wordform, frequencies.get(wordform) + 1);
  else frequencies.set(wordform, 1);

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
function processFile(filePath, frequencies) {
  return new Promise((resolve, reject) => {

    const parser     = JSONStream.parse(`utterances`);
    const readStream = fs.createReadStream(filePath);

    parser.on(`error`, reject);
    parser.on(`data`, word => countToken(word, frequencies));
    parser.on(`end`, resolve);

    // parser.on(`data`, console.log);

    readStream.pipe(parser);

  });
}

// MAIN

export default async function generateWordforms(dataDir, outputPath) {

  const frequencies = new Map;

  await processDir(dataDir, filePath => processFile(filePath, frequencies), ignore);

  const json = convertFrequencies(frequencies);
  const csv  = await json2csv(json, csvOptions);

  await writeFile(outputPath, csv, `utf8`);

}
