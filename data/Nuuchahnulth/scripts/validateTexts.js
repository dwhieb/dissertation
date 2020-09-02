/**
 * This script takes each text in the corpus, and passes it to the DLx JS library's Text model for validation.
 */

import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import path              from 'path';
import ProgressBar       from 'progress';
import { Text }          from '@digitallinguistics/javascript/models';

const {
  readJSON,
  readdir: readDir,
  writeJSON,
} = fs;

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const textsDir   = path.join(currentDir, `../texts`);

function readFile(filename) {
  return readJSON(path.join(textsDir, filename), `utf8`);
}

void async function validateTexts() {

  const filenames   = await readDir(textsDir);
  const progressBar = new ProgressBar(`:bar :current :total :percent :eta`, { total: filenames.length });
  const data        = await Promise.all(filenames.map(readFile));
  const models      = data.map(textData => new Text(textData));

  return Promise.all(models.map(async (model, i) => {

    const filename = filenames[i];
    const filePath = path.join(textsDir, filename);

    await writeJSON(filePath, model, { encoding: `utf8`, spaces: 2 });

    progressBar.tick();

  }));

}();
