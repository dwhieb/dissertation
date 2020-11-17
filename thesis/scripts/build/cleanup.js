/**
 * Cleans build files from the source directory, except .aux files
 */

import createSpinner     from 'ora';
import { fileURLToPath } from 'url';
import fs                from 'fs';
import path              from 'path';
import recurse           from 'recursive-readdir';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const { unlink: removeFile } = fs.promises;

const allowList = [
  `**/*.aux`,
  `**/*.bbx`,
  `**/*.bib`,
  `**/*.cbx`,
  `**/*.jpg`,
  `**/*.json`,
  `**/*.md`,
  `**/*.pdf`,
  `**/*.png`,
  `**/*.sty`,
  `**/*.tex`,
  `**/*.yml`,
];

void async function cleanup() {

  const spinner = createSpinner(`Cleaining source directory`).start();

  try {

    const files = await recurse(path.join(currentDir, `../../src`), allowList);

    await Promise.all(files.map(removeFile));

  } catch (e) {

    return spinner.fail(e.message);

  }

  spinner.succeed(`Directory cleaned`);

}();
