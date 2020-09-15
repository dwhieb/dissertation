import fs         from 'fs-extra';
import path       from 'path';
import processDir from '../../../scripts/utilities/processDir.js';

const {
  readJSON,
  writeJSON,
} = fs;

const dataDir = 'data/english/texts';

/**
 * Ignore method which tells recursive-readdir to ignore any non-JSON files
 */
function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

async function updateTranscriptions(filePath) {

  const text = await readJSON(filePath);

  text.utterances.forEach(u => {

    u.transcription = {};

    u.words.forEach(w => {

      w.transcription = { default: w.transcription };

    });

  });

  await writeJSON(filePath, text, { encoding: `utf8`, spaces: 2 });

}

processDir(dataDir, updateTranscriptions, ignore);
