import badPOS         from '../constants/badPOS.json';
import fs             from 'fs';
import JSONStream     from 'JSONStream';
import path           from 'path';
import pennTags       from '../constants/POS.json';
import { processDir } from '../utilities/index.js';

const { rename, unlink } = fs.promises;

const badCharsRegExp = /[-_./%�[\]0-9]/gu;
const pos            = Object.keys(pennTags);

/**
 * Checks whether a word contains unnecessary data
 * @param  {Object}  word The word as a POJO
 * @return {Boolean}
 */
function isBadData({ POS, token }) {
  return badPOS.includes(POS)    // unnecessary part of speech
  || !pos.includes(POS)          // not a recognized part of speech
  || badCharsRegExp.test(token); // includes Arabic numerals or other punctuation
}

const removeBadTokens = filePath => new Promise((resolve, reject) => {

  const dir         = path.dirname(filePath);
  const filename    = path.basename(filePath, `.json`);
  const newFilename = `${filename}_filtered.json`;
  const newFilePath = path.join(dir, newFilename);

  const parser      = JSONStream.parse(`*`);
  const readStream  = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(newFilePath);

  let firstChunk = true;

  writeStream.write(`[\n`);

  parser.on(`error`, reject);

  parser.on(`data`, word => {

    if (isBadData(word)) return;

    if (!firstChunk) writeStream.write(`,\n`);

    const json = JSON.stringify(word, null, 2);

    writeStream.write(json);

    firstChunk = false;

  });

  parser.on(`end`, () => writeStream.end(`]`, async () => {
    await unlink(filePath);
    await rename(newFilePath, filePath);
    resolve();
  }));

  readStream.pipe(parser);

});

/**
 * The ignore function for the recurse method
 */
function ignore(filePath, stats) {

  if (stats.isDirectory()) return false;

  return path.extname(filePath) !== `.json`;

}

export default dataDir => processDir(dataDir, removeBadTokens, ignore);
