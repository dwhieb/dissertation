import { fileURLToPath } from 'url';
import generateWordforms from './generateWordforms.js';
import path              from 'path';

// eslint-disable-next-line no-underscore-dangle, no-shadow
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dataDir       = path.join(__dirname, `../../data/English/data`);
const wordformsPath = path.join(__dirname, `../../data/English/stats/wordforms.tsv`);

void async function stats() {
  await generateWordforms(dataDir, wordformsPath);
}();
