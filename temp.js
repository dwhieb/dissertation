import fs      from 'fs';
import path    from 'path';
import recurse from 'recursive-readdir';

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.txt`;
}

void async function deleteUnwantedFiles() {

  const files = await recurse(`data/English/data`, [ignore]);

  // eslint-disable-next-line no-await-in-loop
  for (const filePath of files) await fs.promises.unlink(filePath);

}();
