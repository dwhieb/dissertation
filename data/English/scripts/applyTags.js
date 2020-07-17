/**
 * This script applies the manual annotations back to the DLx JSON version of the corpus.
 */

import fs         from 'fs-extra';
import parseTSV   from 'csv-parse';
import path       from 'path';
import processDir from '../../../scripts/utilities/processDir.js';

const {
  readJSON,
  writeJSON,
} = fs;

/**
 * Ignore method which tells recursive-readdir to ignore any non-JSON files
 */
function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

/**
 * Applies the manually-created annotations to the DLx JSON version of the corpus
 * @param  {String} annotationsPath The path to the annotations file. Must be a TSV file with the columns described in the readme.
 * @param  {String} dataDir         The path to the directory of JSON files to apply the tags to
 * @return {Promise}
 */
export default async function applyTags(annotationsPath, dataDir) {

  const options = {
    columns:            true,
    delimiter:          `\t`,
    skipLinesWithError: true,
    trim:               true,
  };

  const readStream = fs.createReadStream(annotationsPath, `utf8`);
  const parser     = parseTSV(options);
  let   records    = [];

  readStream.pipe(parser);

  for await (const record of parser) {
    records.push(record);
  }

  const processText = async function(filePath) {

    const name = path.basename(filePath, `.json`);
    const text = await readJSON(filePath);

    records = records
    .filter(({
      archilexeme,
      function: discourseFunction,
      text: textName,
      utterance: u,
      word: w,
    }) => {

      if (name === textName) {
        const word = text.utterances[u - 1].words[w - 1];
        word.stem = archilexeme;
        word.tags.discourseFunction = discourseFunction;
        return false;
      }

      return true;

    });

    // const newFilePath = filePath.replace(`.json`, `-updated.json`);
    await writeJSON(filePath, text, { spaces: 2 });

  };

  console.info(`Applying tags to English corpus`);

  await processDir(dataDir, processText, ignore);

}
