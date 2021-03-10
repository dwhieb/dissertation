#!/usr/bin/env node

/**
 * Calculate cumulative flexibility for a corpus.
 *
 * Arguments:
 *
 * <corpus> (required)                       "English" or "Nuuchahnulth"
 * -o, --out (optional; default = "out.tsv") The path where you would like the data output
 * -s, --samples (optional; default = 1)     The number of samples to run
 */

import getCumulativeFlexibility from '../getCumulativeFlexibility.js';
import parseArgs                from 'yargs-parser';

const {
  _: [language],
  o,
  out,
  s,
  samples,
} = parseArgs(process.argv.slice(2));

if (!language) {
  throw new Error(`Please provide the language as the first argument: English | Nuuchahnulth`);
}

getCumulativeFlexibility(
  language,
  o || out,
  s || samples,
)
.catch(e => { throw e; });
