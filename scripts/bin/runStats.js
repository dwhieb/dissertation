#!/usr/bin/env node

import runStats from '../stats/index.js';

const [,, dataDir, outputDir] = process.argv;

if (!dataDir) throw new Error(`Please provide the path to the data directory as the first argument`);

if (!outputDir) throw new Error(`Please provide the path to the file to output as the second argument`);

runStats(dataDir, outputDir);
