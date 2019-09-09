// IMPORTS

import csvStringify  from 'csv-stringify';
import fs            from 'fs';
import JSONStream    from 'JSONStream';
import path          from 'path';
import { promisify } from 'util';

import {
  convertFrequencies,
  processDir,
} from '../utilities/index.js';

const json2csv      = promisify(csvStringify);
const { writeFile } = fs.promises;

// VARIABLES

/**
 * Options for the CSV stringifier
 * @type {Object}
 */
const csvOptions = { delimiter: `\t` };

// METHODS

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

// MAIN

/**
 * Aggregates data in the corpus based on the provided aggregator, producing a tab-delimited file with the results
 * @param  {String}   dir        The path to the data directory to aggregate
 * @param  {String}   outputPath The path to the file to save the results to
 * @param  {Function} aggregator A function that accepts a Map of frequencies and a word object as arguments. This function should adjust the frequencies Map as appropriate, based on the data in the word object.
 * @param  {Array}    columns    An array of column names to use for the resulting file
 * @return {Promise}
 */
export default async function aggregate(dir, outputPath, aggregator, columns) {

  const frequencies = new Map;

  const processFile = filePath => new Promise((resolve, reject) => {

    const parser     = JSONStream.parse(`*`);
    const readStream = fs.createReadStream(filePath);

    parser.on(`error`, reject);

    parser.on(`data`, word => aggregator(frequencies, word));

    parser.on(`end`, resolve);

    readStream.pipe(parser);

  });

  await processDir(dir, processFile, ignore);

  if (columns) {
    csvOptions.columns = columns;
    csvOptions.header  = true;
  }

  const csv = await json2csv(convertFrequencies(frequencies), csvOptions);

  await writeFile(outputPath, csv, `utf8`);

}
