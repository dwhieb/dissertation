import fs         from 'fs-extra';
import path       from 'path';
import processDir from '../../../scripts/utilities/processDir.js';

const {
  readJSON,
  writeFile,
} = fs;

const dataDir    = `data/English/texts`;
const targetSize = 8366;
const texts      = [];
let corpusSize   = 0;

async function getSample(filePath) {

  const text = await readJSON(filePath);

  text.utterances.forEach(u => {
    if (!u.words?.length) return;
    corpusSize += u.words.length;
  });

  texts.push(text.title.eng);

  if (corpusSize >= targetSize) {

    await writeFile(`texts.txt`, texts.join(`\n`), `utf8`);
    throw new Error(`Done!`);

  }

}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

processDir(dataDir, getSample, ignore);
