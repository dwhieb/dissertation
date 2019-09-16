import { fileURLToPath } from 'url';
import fs                from 'fs';
import JSONStream        from 'JSONStream';
import path              from 'path';
import { processDir }    from '../utilities/index.js';
import yamlParser        from 'js-yaml';

const { rename, unlink } = fs.promises;

// eslint-disable-next-line no-shadow, no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const badTags = [
  `POS`,
  `SYM`,
];

const pennTagsPath = path.join(__dirname, `../constants/tags.yml`);
const pennTagsYAML = fs.readFileSync(pennTagsPath); // eslint-disable-line no-sync
const pennTagsJSON = yamlParser.load(pennTagsYAML);
const pennTags     = Object.keys(pennTagsJSON);

/**
 * Checks whether a word contains unnecessary data
 * @param  {Object}  word The word as a POJO
 * @return {Boolean}
 */
function isBadData({ POS, token }) {
  return badTags.includes(POS)  // unnecessary part of speech
  || !pennTags.includes(POS)    // not a recognized part of speech
  || isBadOneLetterWord(token); // one letter other than "a" or "I"
}

/**
 * Checks whether a token is one letter long but not "a" or "I"
 */
function isBadOneLetterWord(token) {
  return token.length === 1
  && !(
    token === `a`
    || token === `I`
    || /^[0-9]$/u.test(token)
  );
}

const removeUnwantedTokens = filePath => new Promise((resolve, reject) => {

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

export default dataDir => processDir(dataDir, removeUnwantedTokens, ignore);
