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

const columns = [
  `wordform`,
  `frequency`,
];

const csvOptions = {
  columns,
  delimiter: `\t`,
  header:    true,
};

const [,, dataDir] = process.argv;

// METHODS

const convertFrequencies = map => [...map.entries()]
.sort(([wordA, freqA], [wordB, freqB]) => compare(freqB, freqA) || compare(wordA, wordB));

const generateWordforms = filePath => new Promise((resolve, reject) => {

  const dir         = path.dirname(filePath);
  const filename    = path.basename(filePath, `.json`);
  const newFilename = `${filename}_wordforms.json`;
  const newFilePath = path.join(dir, newFilename);

  const parser     = JSONStream.parse(`*.token`);
  const readStream = fs.createReadStream(filePath);

  const frequencies = new Map;

  parser.on(`error`, reject);

  parser.on(`data`, token => {

    token = token.toLowerCase(); // eslint-disable-line no-param-reassign

    if (frequencies.has(token)) frequencies.set(token, frequencies.get(token) + 1);
    else frequencies.set(token, 1);

  });

  parser.on(`end`, async () => {
    console.log(await json2csv(convertFrequencies(frequencies), csvOptions));
    // await writeFile(newFilePath, ``, `utf8`);
    resolve();
  });

  readStream.pipe(parser);

});

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  if (filePath.endsWith(`_wordforms.json`)) return true;
  return path.extname(filePath) !== `.json`;
}

// MAIN

processDir(dataDir, generateWordforms, ignore);
