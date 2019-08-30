/**
 * Copies main.pdf from the /src folder into the project root as dissertation.pdf
 */

import { createRequire } from 'module';
import createSpinner     from 'ora';
import fs                from 'fs';
import meta              from '../../package.json';
import path              from 'path';
import rootDir           from '../constants/rootDir.mjs';

const { copyFile: copy } = fs.promises;
const require            = createRequire(import.meta.url);

const distFilePath = path.join(rootDir, `src/main.pdf`);

async function copyFiles() {

  const spinner = createSpinner(`Copying PDF files`);
  spinner.start();

  try {

    // Copy latest dist to unversioned PDF
    await copy(distFilePath, path.join(rootDir, `dissertation.pdf`));

    // Copy latest dist to versioned PDF
    await copy(distFilePath, path.join(rootDir, `archive/v${meta.version}.pdf`));

  } catch (e) {

    if (e.code === `ENOENT`) return spinner.warn(`PDF does not exist`);
    return spinner.fail(e.message);

  }

  spinner.succeed(`PDF copied`);

}

if (require.main === undefined) copyFiles();

export default copyFiles;
