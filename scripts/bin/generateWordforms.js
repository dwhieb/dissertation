#!/usr/bin/env node

import generateWordforms from '../stats/generateWordforms.js';

const [,, dataDir, outputPath] = process.argv;

if (!dataDir) throw new Error(`Please provide the path to the data directory as the first argument.`);
if (!outputPath) throw new Error(`Please provide the path where you would like the wordforms file generated.`);

generateWordforms(dataDir, outputPath).catch(console.error);
