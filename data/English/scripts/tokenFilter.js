/* eslint-disable
  no-sync,
*/

import { fileURLToPath } from 'url';
import fs                from 'fs';
import path              from 'path';
import YAML              from 'yaml';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const nonLexicalTagsPath = path.join(currentDir, `./constants/nonLexicalTags.yml`);
const nonLexicalTagsYAML = fs.readFileSync(nonLexicalTagsPath, `utf8`);
const nonLexicalTags     = YAML.parse(nonLexicalTagsYAML);

const blacklistPath      = path.join(currentDir, `./constants/blacklist.yml`);
const blacklistYAML      = fs.readFileSync(blacklistPath, `utf8`);
const blacklist          = YAML.parse(blacklistYAML);

const badCharsRegExp = /[^A-Za-z]/u;

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
export default function isGoodToken({ tags: { Penn }, transcription }) {
  if (blacklist.includes(transcription)) return false;
  if (hasBadChars(transcription)) return false;
  if (nonLexicalTags.includes(Penn)) return false;
  return true;
}
