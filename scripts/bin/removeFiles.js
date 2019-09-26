#!/usr/bin/env node

import { removeFiles } from '../utilities/index.js';

const [,, dir, ending] = process.argv;

if (!dir) throw new Error(`Please provide the path to the data directory as the first argument.`);
if (!ending) throw new Error(`Please provide the extension or filename ending to delete as the second argument`);

removeFiles(dir, ending);
