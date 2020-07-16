#!/usr/bin/env node

import getLexemeFrequencies from '../getStatistics.js';
import parseArguments       from 'yargs-parser';

const options = {
  alias: {
    filter:     `f`,
    outputPath: [`o`, `out`],
    unit:       `u`,
  },
  narg: 1,
};

const {
  _: [dataDir],
  outputPath,
  unit,
} = parseArguments(process.argv.slice(2), options);

if (!dataDir) throw new Error(`Please provide the path to the data directory as the first argument.`);

getLexemeFrequencies(dataDir, { outputPath, unit }).catch(console.error);
