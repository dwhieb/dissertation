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

/**
 * A Map of aggregate frequencies for each wordform in the corpus
 * @type {Map}
 */
const frequencies = new Map;

// METHODS

const aggregateWordforms = filePath => new Promise((resolve, reject) => {

  const parser     = JSONStream.parse(`*`);
  const readStream = fs.createReadStream(filePath);

  parser.on(`error`, reject);

  parser.on(`data`, ({ POS, token }) => {

    const wordform = `${token.toLowerCase()}_${POS}`;

    if (frequencies.has(wordform)) frequencies.set(wordform, frequencies.get(wordform) + 1);
    else frequencies.set(wordform, 1);

  });

  parser.on(`end`, resolve);

  readStream.pipe(parser);

});

function convertFrequencies(map) {
  return [...map.entries()]
  .sort(([wordA, freqA], [wordB, freqB]) => compare(freqB, freqA) || compare(wordA, wordB));
}

async function generateWordforms(dir, outputPath) {
  await processDir(dir, aggregateWordforms, ignore);
  const csv = await json2csv(convertFrequencies(frequencies), csvOptions);
  await writeFile(outputPath, csv, `utf8`);
}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

export default (dataDir, outputPath) => generateWordforms(dataDir, outputPath);
