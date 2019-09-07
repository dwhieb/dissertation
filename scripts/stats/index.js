import clearAuxFiles     from '../data/clearAuxFiles.js';
import convertCoNLL      from '../data/convertCoNLL.js';
import { fileURLToPath } from 'url';
import path              from 'path';
import removeBadTokens   from '../data/removeBadTokens.js';

// eslint-disable-next-line no-underscore-dangle, no-shadow
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dataDir = path.join(__dirname, `../../data/English/data`);

void async function stats() {
  await clearAuxFiles(dataDir);
  await convertCoNLL(dataDir);
  await removeBadTokens(dataDir);
}();
