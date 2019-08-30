/**
 * Cleans build files from the provided directory, except .aux files
 */

import { createRequire } from 'module';
import createSpinner     from 'ora';
import fs                from 'fs';
import path              from 'path';
import recurse           from 'recursive-readdir';
import rootDir           from '../constants/rootDir.js';

const require                = createRequire(import.meta.url);
const { unlink: removeFile } = fs.promises;

const whiteList = [
  `**/*.aux`,
  `**/*.bbx`,
  `**/*.bib`,
  `**/*.cbx`,
  `**/*.pdf`,
  `**/*.sty`,
  `**/*.tex`,
  `**/*.yml`,
];

async function cleanup(dir = `.`) {

  const spinner = createSpinner(`Cleaining directory ${dir}`).start();

  try {

    const files = await recurse(dir, whiteList);

    await Promise.all(files.map(removeFile));

  } catch (e) {

    return spinner.fail(e.message);

  }

  spinner.succeed(`Directory cleaned`);

}

if (require.main === undefined) cleanup(path.join(rootDir, `src`));

export default cleanup;
