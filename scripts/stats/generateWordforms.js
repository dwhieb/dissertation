/* eslint-disable
  max-statements,
  no-await-in-loop,
*/

// IMPORTS

import fs          from 'fs';
import path        from 'path';
import ProgressBar from 'progress';
import recurse     from 'recursive-readdir';

const {
  readFile,
  writeFile,
} = fs.promises;

// METHODS

/**
 * Increments the frequency of a word token in a frequency Map
 * @param  {Object} word        A DLx Word Token object
 * @param  {Map}    frequencies A Map of wordforms to their frequencies
 */
function countToken({ transcription }, frequencies) {

  const wordform = transcription.toLowerCase();

  if (frequencies.has(wordform)) frequencies.set(wordform, frequencies.get(wordform) + 1);
  else frequencies.set(wordform, 1);

}

/**
 * Ignore method which tells recursive-readdir to ignore any non-DLx files
 */
function ignoreNonDLx(filePath, stats) {
  if (stats.isDirectory()) return false;
  if (filePath.endsWith(`_wordforms.json`)) return true;
  return path.extname(filePath) !== `.json`;
}

/**
 * Ignore all files except JSON files containing wordform frequencies (_wordforms.json)
 */
function ignoreNonWordforms(filePath, stats) {
  if (stats.isDirectory()) return false;
  return !filePath.endsWith(`_wordforms.json`);
}

// MAIN

/**
 * Generates a tab-delimited file of raw frequencies and dispersions for each wordform in the corpus
 * @param  {String} dataDir    The directory of JSON files to calculate frequencies for
 * @param  {String} outputPath The path to the file to generate
 * @return {Promise}
 */
export default async function generateWordforms(dataDir, outputPath) {

  const corpusWordforms = new Map;
  const textSizes       = new Map;

  const dlxFiles               = await recurse(dataDir, [ignoreNonDLx]);
  const frequenciesProgressBar = new ProgressBar(`:bar`, { total: dlxFiles.length });

  console.info(`Calculating raw frequencies`);

  for (const filePath of dlxFiles) {

    const json           = await readFile(filePath, `utf8`);
    const { utterances } = JSON.parse(json);
    const textWordforms  = new Map;

    // increment text and corpus counts for each token in the text
    utterances.forEach(({ words }) => words.forEach(w => {
      countToken(w, textWordforms);
      countToken(w, corpusWordforms);
    }));

    const filename = path.basename(filePath, `.json`);
    const textSize = Array.from(textWordforms.values())
    .reduce((sum, count) => sum + count, 0);

    textSizes.set(filename, textSize);

    const textFrequenciesJSON   = JSON.stringify(Object.fromEntries(textWordforms), null, 2);
    const textWordformsFilename = path.join(path.dirname(filePath), `${filename}_wordforms.json`);
    await writeFile(textWordformsFilename, textFrequenciesJSON, `utf8`);

    frequenciesProgressBar.tick();

  }

  const corpusSize = Array.from(corpusWordforms.values())
  .reduce((sum, count) => sum + count, 0);

  console.info(`\nSize of Corpus: ${corpusSize.toLocaleString()} words\n`);

  const dispersionsProgressBar = new ProgressBar(`:bar`, { total: corpusWordforms.size });

  corpusWordforms.forEach((corpusFrequency, wordform) => {

    // calculate the dispersion of the wordform
    // swap corpus frequency for an info object with frequency & dispersion properties

    dispersionsProgressBar.tick();

  });

  // start a new progress bar
  // cleanup the text wordform frequency files
  // end progress bar

  // generate wordforms file (with total corpus frequencies and dispersions)

}
