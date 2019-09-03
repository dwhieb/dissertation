import convertCoNLL      from './convertCoNLL.js';
import { fileURLToPath } from 'url';
import path              from 'path';
import recurse           from 'recursive-readdir';

// eslint-disable-next-line no-underscore-dangle, no-shadow
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir   = path.join(__dirname, `../../data/English/data`);

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) === `.json`;
}

/**
 * Converts the CoNLL version of the MASC data to JSON
 * @return {Promise}
 */
void async function convert() {

  const files = await recurse(dataDir, [ignore]);

  for (const filepath of files) {
    await convertCoNLL(filepath); // eslint-disable-line no-await-in-loop
  }

}();
