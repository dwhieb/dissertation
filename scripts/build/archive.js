/**
 * Copies src/main.pdf to archive/drafts with the current version number
 */

import createSpinner     from 'ora';
import { fileURLToPath } from 'url';
import fs                from 'fs';
import meta              from '../../package.json';
import path              from 'path';

const { copyFile } = fs.promises;
const __dirname    = path.dirname(fileURLToPath(import.meta.url));
const distPath     = path.join(__dirname, `../../archive/drafts/v${meta.version}.pdf`);
const srcPath      = path.join(__dirname, `../../src/main.pdf`);

void async function archive() {

  const spinner = createSpinner(`Archiving PDF`).start();

  try {

    await copyFile(srcPath, distPath);

  } catch (e) {

    if (e.code === `ENOENT`) return spinner.warn(`PDF does not exist`);
    return spinner.fail(e.message);

  }

  spinner.succeed(`PDF archived`);

}();
