/**
 * Populates the TeX \version variable in version.tex
 */

import { createRequire } from 'module';
import createSpinner     from 'ora';
import { fileURLToPath } from 'url';
import fs                from 'fs';
import path              from 'path';

const currentDir    = path.dirname(fileURLToPath(import.meta.url));
const require       = createRequire(import.meta.url);
const { version }   = require(`../../../package.json`);

const { writeFile } = fs.promises;


void async function populateVersion() {

  const spinner = createSpinner(`Populating \\version variable`).start();

  try {

    const data        = `\\def\\version{${version}}`;
    const versionPath = path.join(currentDir, `../../src/utilities/version.tex`);

    await writeFile(versionPath, data, `utf8`);

  } catch (e) {

    return spinner.fail(e.message);

  }

  spinner.succeed(`\\version variable populated`);

}();
