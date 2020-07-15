/* eslint-disable
  max-statements,
  no-await-in-loop,
*/

// IMPORTS

import csvStringify      from 'csv-stringify';
import fs                from 'fs';
import path              from 'path';
import ProgressBar       from 'progress';
import { promisify }     from 'util';
import recurse           from 'recursive-readdir';

const {
  readFile,
  writeFile,
} = fs.promises;

const json2csv = promisify(csvStringify);

/**
 * Generates a tab-delimited file of raw frequencies and dispersions for each wordform in the corpus
 * @param  {String}   dataDir        The directory of JSON files to calculate frequencies for
 * @param  {String}   outputPath     The path to the file to generate
 * @param  {Function} filterFunction A filter function which accepts a DLx Word Token, and returns true to keep the word, false otherwise. Excluded words will be included in frequency counts, but not the final list of generated wordforms.
 * @return {Promise}
 */
export default async function generateWordforms(dataDir, outputPath) {

  // RELATIVE TEXT SIZES

  texts.forEach(info => {
    // eslint-disable-next-line no-param-reassign
    info.relativeSize = info.rawSize / corpusSize;
  });


  // DISPERSIONS

  console.info(`Calculating corpus dispersions`);

  const dispersionsProgressBar = new ProgressBar(`:bar`, { total: corpusWordforms.size });

  for (const [wordform, corpusFrequency] of corpusWordforms) {

    const textFrequencies = new Map;

    // raw and relative frequencies of the wordform in each text
    for (const [text, { wordforms }] of texts) {

      const textFrequency = wordforms.get(wordform) || 0;

      textFrequencies.set(text, {
        raw:      textFrequency,
        relative: textFrequency / corpusFrequency,
      });

    }

    // absolute difference between
    // expected relative frequency of the wordform in each text
    // and
    // actual relative frequency of the wordform in each text
    const differences = Array.from(texts.entries())
    .reduce((diffs, [text, { relativeSize: expectedFreq }]) => {

      const { relative: actualFreq } = textFrequencies.get(text);
      const diff = Math.abs(expectedFreq - actualFreq);

      return diffs.set(text, diff);

    }, new Map);

    // sum of the absolute differences calculated above
    const sumDifferences = Array.from(differences.values())
    .reduce((sum, count) => sum + count, 0);

    // measure of corpus dispersion (Deviation of Proportions (DP))
    const dispersion = sumDifferences / 2;

    corpusWordforms.set(wordform, {
      dispersion,
      frequency: corpusFrequency,
    });

    dispersionsProgressBar.tick();

  }

  const csvOptions = {
    columns: [
      `wordform`,
      `frequency`,
      `dispersion`,
    ],
    delimiter: `\t`,
    header:    true,
  };

  // wordforms.tsv
  const tableData = Array.from(corpusWordforms.entries())
  .map(([wordform, { dispersion, frequency }]) => [wordform, frequency, dispersion]);

  const wordformsTSV = await json2csv(tableData, csvOptions);
  await writeFile(outputPath, wordformsTSV, `utf8`);

}
