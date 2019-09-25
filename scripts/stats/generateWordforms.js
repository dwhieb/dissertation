// IMPORTS

import fs             from 'fs';
import { processDir } from '../utilities/index.js';

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

// METHODS

function aggregateWordforms(filePath) {

}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
}

// MAIN

export default async function generateWordforms(dataDir, outputPath) {

  const frequencies = new Map;

  const csv = 'Jambo dunia!';

  await writeFile(outputPath, csv, `utf8`);

}
