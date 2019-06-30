/**
 * Copies main.pdf from the /src folder into the project root as dissertation.pdf
 */

import { createRequire } from 'module';
import createSpinner     from 'ora';
import fs                from 'fs';
import path              from 'path';
import rootDir           from './rootDir.mjs';

const { copyFile: copy } = fs.promises;
const require            = createRequire(import.meta.url);

const srcPath  = path.join(rootDir, `src/main.pdf`);
const destPath = path.join(rootDir, `dissertation.pdf`);

async function copyPDF() {

  const spinner = createSpinner(`Copying PDF`);
  spinner.start();

  try {

    await copy(srcPath, destPath);

  } catch (e) {

    if (e.code === `ENOENT`) return spinner.warn(`PDF does not exist`);
    return spinner.fail(e.message);

  }

  spinner.succeed(`PDF copied`);

}

if (require.main === undefined) copyPDF();

export default copyPDF;
