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

/**
 * Checks whether a DLx Word Token object has any unwanted characters
 */
function isUnwantedWord({ transcription }) {
  return /[^A-Za-z']/gu.test(transcription);
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
  const texts           = new Map;

  const dlxFiles               = await recurse(dataDir, [ignoreNonDLx]);
  const frequenciesProgressBar = new ProgressBar(`:bar`, { total: dlxFiles.length });

  console.info(`Calculating raw frequencies`);

  for (const filePath of dlxFiles) {

    const json           = await readFile(filePath, `utf8`);
    const { utterances } = JSON.parse(json);
    const textWordforms  = new Map;

    // increment text and corpus counts for each token in the text
    utterances.forEach(({ words }) => words.forEach(w => {
      if (isUnwantedWord(w)) return;
      countToken(w, textWordforms);
      countToken(w, corpusWordforms);
    }));

    const filename = path.basename(filePath, `.json`);
    const textSize = Array.from(textWordforms.values())
    .reduce((sum, count) => sum + count, 0);

    texts.set(filename, {
      rawSize:   textSize,
      wordforms: textWordforms,
    });

    frequenciesProgressBar.tick();

  }

  const corpusSize = Array.from(corpusWordforms.values())
  .reduce((sum, count) => sum + count, 0);

  console.info(`\nSize of Corpus: ${corpusSize.toLocaleString()} words\n`);

  texts.forEach(info => {
    // eslint-disable-next-line no-param-reassign
    info.relativeSize = info.rawSize / corpusSize;
  });

  const dispersionsProgressBar = new ProgressBar(`:bar`, { total: corpusWordforms.size });
  // const textWordformFiles      = await recurse(dataDir, [ignoreNonWordforms]);

  console.info(`Calculating corpus dispersions`);

  for (const [wordform, corpusFrequency] of corpusWordforms) {

    const textFrequencies = new Map;

    for (const [text, { wordforms }] of texts) {

      const textFrequency = wordforms.get(wordform) || 0;

      textFrequencies.set(text, {
        raw:      textFrequency,
        relative: textFrequency / corpusFrequency,
      });

    }

    // absolute difference between expected relative frequency of wordform in each text
    // and actual relative frequency of wordform in each text
    const differences = Array.from(texts.entries())
    .reduce((diffs, [text, { relativeSize: expectedFreq }]) => {

      const { relative: actualFreq } = textFrequencies.get(text);
      const diff = Math.abs(expectedFreq - actualFreq);

      return diffs.set(text, diff);

    }, new Map);

    // sum of the absolute differences calculated above
    const sumDifferences = Array.from(differences.values()).reduce((sum, count) => sum + count, 0);

    // measure of corpus dispersion (Deviation of Proportions (DP))
    const dispersion = sumDifferences / 2;

    corpusWordforms.set(wordform, {
      dispersion,
      frequency: corpusFrequency,
    });

    dispersionsProgressBar.tick();

  }

  // TODO: start a new progress bar
  // TODO: cleanup the text wordform frequency files
  // TODO: end progress bar

  // TODO: generate wordforms file (with total corpus frequencies and dispersions)

}
