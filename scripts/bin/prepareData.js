#!/usr/bin/env node

import prepareData from '../data/index.js';

const [,, dir] = process.argv;

if (!dir) throw new Error(`Please provide the path to the data directory`);

prepareData(dir);
