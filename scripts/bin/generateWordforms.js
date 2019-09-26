#!/usr/bin/env node

import generateWordforms from '../stats/generateWordforms.js';

const [,, dataDir, outputDir] = process.argv;

if (!dataDir) throw new Error(`Please provide the path to the data directory as the first argument.`);
if (!outputDir) throw new Error(`Please provide the path where you would like the wordforms file generated.`);

generateWordforms(dataDir, outputDir).catch(console.error);
