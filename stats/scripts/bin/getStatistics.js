#!/usr/bin/env node

import getLexemeFrequencies from '../getStatistics.js';
import parseArguments       from 'yargs-parser';

const options = {
  alias: {
    filter:     `f`,
    outputPath: [`o`, `out`],
  },
  narg: 1,
};

// const args = parseArguments(process.argv.slice(2), options);
//
// console.log(args);

const {
  _: [dataDir],
  outputPath,
} = parseArguments(process.argv.slice(2), options);

if (!dataDir) throw new Error(`Please provide the path to the data directory as the first argument.`);

getLexemeFrequencies(dataDir, { outputPath }).catch(console.error);
