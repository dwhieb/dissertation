#!/usr/bin/env node

import getCumulativeFlexibility from '../getCumulativeFlexibility.js';

const [,, language, outputPath] = process.argv;

if (!language) {
  throw new Error(`Please provide the language as the first argument: English | Nuuchahnulth`);
}

getCumulativeFlexibility(language, outputPath)
.catch(e => { throw e; });
