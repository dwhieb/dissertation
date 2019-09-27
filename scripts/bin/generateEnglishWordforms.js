#!/usr/bin/env node

import generateEnglishWordforms from '../stats/generateEnglishWordforms.js';

const [,, dataDir, outputPath] = process.argv;

if (!dataDir) throw new Error(`Please provide the path to the data directory as the first argument.`);
if (!outputPath) throw new Error(`Please provide the path where you would like the wordforms file generated.`);

generateEnglishWordforms(dataDir, outputPath).catch(console.error);
