#!/usr/bin/env node

import getLexemeFrequencies from '../lexemeFrequencies.js';

const [,, dataDir, outputPath] = process.argv;

if (!dataDir) throw new Error(`Please provide the path to the data directory as the first argument.`);

getLexemeFrequencies(dataDir, outputPath).catch(console.error);
