/**
 * This script takes each text in the corpus, and passes it to the DLx JS library's Text model for validation.
 */

import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import path              from 'path';
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

  const filenames = await readDir(textsDir);
  const data      = await Promise.all(filenames.map(readFile));
  const models    = data.map(textData => new Text(textData));

  return Promise.all(models.map((model, i) => {

    const json     = JSON.stringify(model, null, 2);
    const filename = filenames[i];
    const filePath = path.join(textsDir, filename);

    return writeJSON(filePath, json, `utf8`);

  }));

}();
