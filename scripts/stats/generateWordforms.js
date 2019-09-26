/* eslint-disable
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
 * Ignore method which tells recursive-readdir to ignore any non-JSON files
 */
function ignoreNonJSON(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

// MAIN

/**
 * Generates a tab-delimited file of raw frequencies and dispersions for each wordform in the corpus
 * @param  {String} dataDir    The directory of JSON files to calculate frequencies for
 * @param  {String} outputPath The path to the file to generate
 * @return {Promise}
 */
export default async function generateWordforms(dataDir, outputPath) {

  const corpusWordformFrequencies = new Map;
  const textSizes                 = new Map;

  const files       = await recurse(dataDir, [ignoreNonJSON]);
  const progressBar = new ProgressBar(`:bar`, { total: files.length });

  console.info(`Calculating raw frequencies`);

  for (const filePath of files) {

    const json                    = await readFile(filePath, `utf8`);
    const { utterances }          = JSON.parse(json);
    const textWordformFrequencies = new Map;

    // increment text and corpus counts for each token in the text
    utterances.forEach(({ words }) => words.forEach(w => {
      countToken(w, textWordformFrequencies);
      countToken(w, corpusWordformFrequencies);
    }));

    const filename = path.basename(filePath, `.json`);
    const textSize = Array.from(textWordformFrequencies.values()).reduce((sum, count) => sum + count, 0);

    textSizes.set(filename, textSize);

    const textFrequenciesJSON   = JSON.stringify(Object.fromEntries(textWordformFrequencies), null, 2);
    const textWordformsFilename = path.join(path.dirname(filePath), `${filename}_wordforms.json`);
    await writeFile(textWordformsFilename, textFrequenciesJSON, `utf8`);

    progressBar.tick();

  }

  // generate total wordform frequencies file
  // get the total corpus size
  // start a new progress bar
  // then, for each wordform in the corpus wordforms file, calculate its dispersion
  // end progress bar
  // start a new progress bar
  // cleanup the text wordform frequency files after
  // end progress bar

}
