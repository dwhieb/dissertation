import badPOS            from '../constants/badPOS.json';
import { fileURLToPath } from 'url';
import fs                from 'fs';
import JSONStream        from 'JSONStream';
import path              from 'path';
import pennTags          from '../constants/POS.json';

// eslint-disable-next-line no-underscore-dangle, no-shadow
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const testFilePath = path.join(__dirname, `../../data/English/data/spoken/court-transcript/Lessig-court-transcript.json`);

const outputFilePath = path.join(__dirname, `../../temp.json`);

const numberRegExp = /[0-9]/gu;
const pos          = Object.keys(pennTags);

// numerals

/**
 * Checks whether a word contains unnecessary data
 * @param  {Object}  word The word as a POJO
 * @return {Boolean}
 */
function isBadData({ POS, token }) {
  return badPOS.includes(POS)  // unnecessary part of speech
  || !pos.includes(POS)        // not a recognized part of speech
  || numberRegExp.test(token); // includes an Arabic numeral
}

const removeBadTokens = () => new Promise((resolve, reject) => {

  const parser      = JSONStream.parse(`*`);
  const readStream  = fs.createReadStream(testFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);

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

  parser.on(`end`, () => writeStream.end(`]`, resolve));

  readStream.pipe(parser);

});

removeBadTokens();
