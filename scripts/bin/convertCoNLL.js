#!/usr/bin/env node

import convertCoNLL from '../data/convertCoNLL.js';

const [,, dir] = process.argv;

if (!dir) throw new Error(`Please provide the path to the directory of CoNLL files you wish to convert`);

convertCoNLL(dir);
