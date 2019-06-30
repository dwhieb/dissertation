import { createRequire } from 'module';
import createSpinner     from 'ora';
import fs                from 'fs';
import hasFlag           from 'has-flag';
import path              from 'path';
import recurse           from 'recursive-readdir';
import rootDir           from './rootPath.mjs';

const require                = createRequire(import.meta.url);
const { unlink: removeFile } = fs;

const whiteList = [
  `**/*.bbx`,
  `**/*.bib`,
  `**/*.cbx`,
  `**/*.pdf`,
  `**/*.sty`,
  `**/*.tex`,
];

async function cleanup({ dir = rootDir, fullClean = false } = {}) {

  const spinner = createSpinner(`Cleaining directory ${dir}`).start();

  try {

    if (!fullClean) whiteList.push(`**/*.aux`);

    const files = await recurse(dir, whiteList);

    await Promise.all(files.map(removeFile));

  } catch (e) {

    spinner.fail(e.message);

  }

  spinner.succeed(`Directory cleaned`);

}

if (require.main === undefined) {

  const fullClean = hasFlag(`--full`);
  const dir       = path.join(rootDir, `src`);

  cleanup({ dir, fullClean });

}

export default cleanup;
