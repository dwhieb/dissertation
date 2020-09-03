/**
 * This script updates the corpus by replacing each utterance in the old texts with each utterance in the new text,
 * while preserving the "stem" field and any tags from the old texts.
 */

import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import path              from 'path';
import processDir        from '../../../scripts/utilities/processDir.js';
import { Text }          from '@digitallinguistics/javascript/models';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const {
  readJSON,
  writeJSON,
} = fs;

const oldDir = path.join(currentDir, `../texts`);
const newDir = path.join(currentDir, `../updated`);

/**
 * Ignore method which tells processDir to ignore non-JSON files
 */
const ignore = (filePath, stats) => {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
};

async function processFile(filePath) {

  const filename = path.basename(filePath);
  const newText  = await readJSON(filePath);
  const oldText  = await readJSON(path.join(oldDir, filename));

  oldText.language = { cid: `1` };

  oldText.utterances = newText.utterances.map((newUtterance, u) => {

    const oldUtterance = oldText.utterances[u];
    if (!oldUtterance.words) return newUtterance;

    oldUtterance.words.forEach((oldWord, w) => {
      const newWord = newUtterance.words[w];
      newWord.tags = oldWord.tags;
      newWord.stem = oldWord.stem;
    });

    return newUtterance;

  });

  await writeJSON(path.join(oldDir, filename), new Text(oldText), { spaces: 2 });

}

processDir(newDir, processFile, ignore)
.catch(console.error);
