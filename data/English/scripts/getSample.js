/* eslint-disable
  max-statements,
*/

import fs         from 'fs-extra';
import path       from 'path';
import processDir from '../../../scripts/utilities/processDir.js';

const {
  readJSON,
  writeJSON,
} = fs;

const dataDir    = `data/English/sample`;
const targetSize = 8366;
let corpusSize   = 0;

const badCharsRegExp = /[^A-Za-z]/u;
const hasBadChars    = str => badCharsRegExp.test(str);

async function getSample(filePath) {

  const text = await readJSON(filePath);

  let utteranceIndex = 0;

  for (const u of text.utterances) {

    if (corpusSize >= targetSize) return;

    if (!u.words?.length) return;

    let wordIndex = 0;

    for (const w of u.words) {

      if (corpusSize >= targetSize) return;

      if (hasBadChars(w.transcription)) return;

      corpusSize++;

      if (corpusSize >= targetSize) {
        u.words = u.words.slice(0, wordIndex + 1);
        return;
      }

      wordIndex++;

    }

    utteranceIndex++;

    if (corpusSize >= targetSize) {
      text.utterances = text.utterances.slice(0, utteranceIndex);
      return;
    }

  }

  if (corpusSize >= targetSize) {

    console.log(corpusSize);
    await writeJSON(filePath, text, { encoding: `utf8`, spaces: 2 });

  }

}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

processDir(dataDir, getSample, ignore);
