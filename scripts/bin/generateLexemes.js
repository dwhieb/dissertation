#!/usr/bin/env node

import generateLexemes from '../stats/generateLexemes.js';

const [,, dataDir, outputPath] = process.argv;

if (!dataDir) throw new Error(`Please provide the path to the data directory as the first argument`);

if (!outputPath) throw new Error(`Please provide the path to the file to output as the second argument`);

generateLexemes(dataDir, outputPath);
