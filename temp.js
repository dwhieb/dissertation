import fs      from 'fs';
import path    from 'path';
import recurse from 'recursive-readdir';

const { unlink } = fs;

const dir = `data/English/data`;

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

void async function removeJSONFiles() {

  const files = await recurse(dir, [ignore]);

  for (const file of files) {
    await unlink(file); // eslint-disable-line no-await-in-loop
  }

}();
