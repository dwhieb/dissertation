import fs         from 'fs-extra';
import path       from 'path';
import processDir from '../../../scripts/utilities/processDir.js';

const {
  readJSON,
  writeJSON,
} = fs;

const dataDir = 'data/English/sample';

/**
 * Ignore method which tells recursive-readdir to ignore any non-JSON files
 */
function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

async function clearTags(filePath) {

  const text = await readJSON(filePath);

  text.utterances.forEach(u => {

    u.words.forEach(w => {
      const { function: func } = w.tags;
      w.tags = { function: func };
    });

  });

  await writeJSON(filePath, text, { encoding: `utf8`, spaces: 2 });

}

processDir(dataDir, clearTags, ignore);
