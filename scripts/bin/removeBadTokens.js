#!/usr/bin/env node

import removeBadTokens from '../data/removeBadTokens.js';

const [,, dir] = process.argv;

if (!dir) throw new Error(`Please provide the path to the directory of JSON files you wish to remove unwanted data from`);

removeBadTokens(dir);
