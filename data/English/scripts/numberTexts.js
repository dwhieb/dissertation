import { v4 as createUUID } from 'uuid';
import fs                   from 'fs-extra';
import path                 from 'path';
import processDir           from '../../../scripts/utilities/processDir.js';

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

async function numberTexts(filePath) {

  const text     = await readJSON(filePath);
  const filename = path.basename(filePath, `.json`);

  text.cid       = createUUID();
  text.language  = { cid: '2' };
  text.title.eng = filename;

  await writeJSON(filePath, text, { encoding: `utf8`, spaces: 2 });

}

processDir(dataDir, numberTexts, ignore);
