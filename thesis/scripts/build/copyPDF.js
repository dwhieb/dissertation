/**
 * Copies thesis/src/main.pdf > dissertation.pdf
 */

import createSpinner     from 'ora';
import { fileURLToPath } from 'url';
import fs                from 'fs';
import path              from 'path';

const { copyFile } = fs.promises;
const currentDir   = path.dirname(fileURLToPath(import.meta.url));
const distPath     = path.join(currentDir, `../../../dissertation.pdf`);
const srcPath      = path.join(currentDir, `../../src/main.pdf`);

void async function copyPDF() {

  const spinner = createSpinner(`Copying PDF`).start();

  try {

    await copyFile(srcPath, distPath);

  } catch (e) {

    if (e.code === `ENOENT`) return spinner.warn(`PDF does not exist`);
    return spinner.fail(e.message);

  }

  spinner.succeed(`PDF copied`);

}();
