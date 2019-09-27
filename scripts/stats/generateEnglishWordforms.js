// IMPORTS

import { fileURLToPath } from 'url';
import fs                from 'fs';
import generateWordforms from './generateWordforms.js';
import path              from 'path';
import YAML              from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// CONSTANTS

const badCharsRegExp     = /[^A-Za-z'’]/u;

const nonLexicalTagsPath = path.join(__dirname, `../../data/English/nonLexicalTags.yml`);
const yaml               = fs.readFileSync(nonLexicalTagsPath, `utf8`); // eslint-disable-line no-sync
const nonLexicalTags     = YAML.parse(yaml);

// METHODS

function hasBadChars(string) {
  return badCharsRegExp.test(string);
}

/**
 * A filter function which accepts a DLx Word Token object for a word in English,
 * and returns true if the token should be included in the wordforms list,
 * false otherwise.
 * @param  {Word}    word A DLx Word Token object for an English word token
 * @return {Boolean}
 */
function isGoodToken({ tags: { Penn }, transcription }) {
  if (hasBadChars(transcription)) return false;
  if (nonLexicalTags.includes(Penn)) return false;
  return true;
}

// MAIN

export default (dataDir, outputPath) => generateWordforms(dataDir, outputPath, isGoodToken);
