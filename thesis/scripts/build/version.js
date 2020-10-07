/**
 * Populates the TeX \version variable in constants.tex
 */

import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import path              from 'path';

const {
  readFile,
  readJSON,
  writeFile,
} = fs;

const currentDir    = path.dirname(fileURLToPath(import.meta.url));
const constantsPath = path.join(currentDir, `../../src/utilities/constants.tex`);
const packagePath   = path.join(currentDir, `../../../package.json`);

void async function populateVersion() {

  console.info(`Populating \\version variable`);

  let constants     = await readFile(constantsPath, `utf8`);
  const { version } = await readJSON(packagePath);

  constants = constants.replace(/\\version\{(?<version>.+?)\}/u, `\\version{${version}}`);

  await writeFile(constantsPath, constants, `utf8`);

  console.info(`\\version variable populated`);

}();
