#!/usr/bin/env node

import applyTags from '../applyTags-2.js';

const [,, annotationsPath, dataDir] = process.argv;

if (!annotationsPath) throw new Error(`Please provide the path to the annotations file as the first argument.`);
if (!dataDir) throw new Error(`Please provide the path to the data directory as the second argument.`);

applyTags(annotationsPath, dataDir)
.catch(console.error);
