#!/usr/bin/env node

import convertOANC from '../data/convertOANC.js';

const [,, dataDir] = process.argv;

if (!dataDir) throw new Error(`Please provide the path to the directory of text files you wish to convert.`);

convertOANC(dataDir);
