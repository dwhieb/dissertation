#!/usr/bin/env node

import getCorpusSizeData from '../getCorpusSizeData.js';

const [,, language, outputPath] = process.argv;

if (!language) {
  throw new Error(`Please provide the language as the first argument: English | Nuuchahnulth`);
}

getCorpusSizeData(language, outputPath)
.catch(e => { throw e; });
