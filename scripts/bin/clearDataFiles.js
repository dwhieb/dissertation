#!/usr/bin/env node

import clearDataFiles from '../data/clearDataFiles.js';

const [,, dir] = process.argv;

if (!dir) throw new Error(`Please provide the path to the directory you wish to clear`);

clearDataFiles(dir);
