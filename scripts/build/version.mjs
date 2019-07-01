/**
 * Populates the TeX \version variable in version.tex
 */

import { createRequire } from 'module';
import createSpinner     from 'ora';
import fs                from 'fs';
import meta              from '../../package.json';
import path              from 'path';
import rootDir           from '../constants/rootDir.mjs';

const require       = createRequire(import.meta.url);
const { writeFile } = fs.promises;
const versionPath   = path.join(rootDir, `src/utilities/version.tex`);
const { version }   = meta;

async function populateVersion() {

  const spinner = createSpinner(`Populating \\version variable`).start();

  try {

    const data = `\\def\\version{${version}}`;

    await writeFile(versionPath, data, `utf8`);

  } catch (e) {

    return spinner.fail(e.message);

  }

  spinner.succeed(`\\version variable populated`);

}

if (require.main === undefined) populateVersion();

export default populateVersion;
