#!/usr/bin/env node

import getStatistics     from '../getStatistics.js';
import parseArguments    from 'yargs-parser';
import { pathToFileURL } from 'url';

// const currentDir = path.dirname(fileURLToPath(import.meta.url));

const options = {
  alias: {
    filterPath: [`f`, `filter`],
    outputPath: [`o`, `out`],
    unit:       `u`,
  },
  narg: 1,
};

const {
  _: [dataDir],
  filterPath,
  outputPath,
  unit,
} = parseArguments(process.argv.slice(2), options);

if (!dataDir) throw new Error(`Please provide the path to the data directory as the first argument.`);

void async function run() {

  let wordFilter = () => true;

  if (filterPath) {
    const filePath = pathToFileURL(filterPath);
    const Module   = await import(filePath);
    wordFilter = Module.default;
  }

  return getStatistics(dataDir, { outputPath, unit, wordFilter });

}();
