import fs         from 'fs-extra';
import path       from 'path';
import processDir from '../../../scripts/utilities/processDir.js';

const {
  readJSON,
  writeJSON,
} = fs;

const dataDir            = `data/English/sample`;
const lastUtteranceIndex = 217;
const lastWordIndex      = 12;

async function getSample(filePath) {

  if (!filePath.includes(`ENG`)) return;

  const text = await readJSON(filePath);

  text.utterances = text.utterances.slice(0, lastUtteranceIndex + 1);

  const lastUtterance = text.utterances[text.utterances.length - 1];

  lastUtterance.words = lastUtterance.words.slice(0, lastWordIndex + 1);

  await writeJSON(filePath, text, { encoding: `utf8`, spaces: 2 });

}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

processDir(dataDir, getSample, ignore);
