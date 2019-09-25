#!/usr/bin/env node

import oanc2json from '../data/oanc2json.js';

const [,, dataDir] = process.argv;

if (!dataDir) throw new Error(`Please provide the path to the data directory as the first argument.`);

oanc2json(dataDir);
