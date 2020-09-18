/**
 * This script gets a list of the unique wordforms of tokens that have a `function` tag, and outputs it to a text file.
 */

import fs   from 'fs-extra';
import path from 'path';
import processDir from '../../../scripts/utilities/processDir.js';

const { readJSON, writeFile } = fs;

const sampleDir = `data/English/sample`;

const badCharsRegExp = /[^A-Za-z]/u;

function hasBadChars(string) {
  return badCharsRegExp.test(string);
}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

const wordforms = new Set;

async function getWordforms(filePath) {

  const text = await readJSON(filePath);

  text.utterances.forEach(u => {

    if (!u.words?.length) return;

    u.words.forEach(w => {

      const wordform = w.transcription.default.toLowerCase();

      if (hasBadChars(wordform)) return;

      wordforms.add(wordform);

    });

  });

}

async function saveWordforms() {

  const sorted = Array.from(wordforms.values()).sort();
  const text   = sorted.join(`\r\n`);

  await writeFile(`data/English/wordforms.txt`, text, `utf8`);

}

processDir(sampleDir, getWordforms, ignore)
.then(saveWordforms)
.catch(console.error);
