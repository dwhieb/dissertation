/* eslint-disable
  guard-for-in,
  no-await-in-loop,
*/

import fs   from 'fs';
import path from 'path';

const {
  readdir: readDir,
  rename,
} = fs.promises;

const textsDir = `data/English/SBC/texts`;

void async function renameFiles() {

  const filenames = await readDir(textsDir);

  for (const oldFilename of filenames) {

    const newFilename = oldFilename
    .replace(/^sbc/u, `SBC`)
    .replace(/_dt2\.txt$/u, `.txt`);

    await rename(path.join(textsDir, oldFilename), path.join(textsDir, newFilename));

  }

}();
