/**
 * This script updates the corpus by replacing each utterance in the old texts with each utterance in the new text,
 * while preserving the "stem" field and any tags from the old texts.
 */

import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import mergeTexts        from './mergeTexts.js';
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

  const filename    = path.basename(filePath);
  const newTextData = await readJSON(filePath);
  const oldTextData = await readJSON(path.join(oldDir, filename));
  const newText     = new Text(newTextData);
  const oldText     = new Text(oldTextData);
  const updatedText = mergeTexts(oldText, newText);

  await writeJSON(path.join(oldDir, filename), updatedText, { spaces: 2 });

}

processDir(newDir, processFile, ignore)
.catch(console.error);
