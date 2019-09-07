import clearAuxFiles     from './clearAuxFiles.js';
import convertCoNLL      from './convertCoNLL.js';
import { fileURLToPath } from 'url';
import path              from 'path';
import removeBadTokens   from './removeBadTokens.js';

// eslint-disable-next-line no-underscore-dangle, no-shadow
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dataDir = path.join(__dirname, `../../data/English/data`);

void async function data() {

  console.info(`removing auxiliary files`);
  await clearAuxFiles(dataDir);

  console.info(`converting CoNLL files to JSON`);
  await convertCoNLL(dataDir);

  console.info(`removing unwanted data`);
  await removeBadTokens(dataDir);

}();
