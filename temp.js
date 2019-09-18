import fs          from 'fs';
import path        from 'path';
import ProgressBar from 'progress';
import recurse     from 'recursive-readdir';

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) === `.txt`;
}

void async function deleteUnwantedFiles() {

  const files       = await recurse(`data/English/data`, [ignore]);
  const progressBar = new ProgressBar(`:bar`, { total: files.length });

  for (const filePath of files) {
    // eslint-disable-next-line no-await-in-loop
    await fs.promises.unlink(filePath);
    progressBar.tick();
  }

}();
