#!/usr/bin/env node

import generateArchlexemes from '../stats/generateArchlexemes.js';

const [,, dataDir, outputPath] = process.argv;

if (!dataDir) throw new Error(`Please provide the path to the data directory as the first argument`);

if (!outputPath) throw new Error(`Please provide the path to the file to output as the second argument`);

generateArchlexemes(dataDir, outputPath);
