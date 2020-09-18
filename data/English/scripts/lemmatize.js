/**
 * This script lemmatizes the English corpus using the latest set of wordform > lexeme mappings
 */

/* eslint-disable
  max-nested-callbacks,
*/

import fs         from 'fs-extra';
import path       from 'path';
import processDir from '../../../scripts/utilities/processDir.js';

const { readJSON, writeJSON } = fs;

const dataDir       = `data/English/texts`;
const wordformsPath = `data/English/subcorpus_wordforms.json`;

const whitelist = [
  `GER`,
  `INF`,
  `PREDCXN`,
  `MOD`,
  `PRED`,
  `REF`,
];

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

void async function lemmatizeTexts() {

  const wordforms = await readJSON(wordformsPath);

  await processDir(dataDir, async filePath => {

    const text = await readJSON(filePath);

    text.utterances.forEach(u => {

      if (!u.words?.length) return;

      u.words.forEach(w => {

        const { function: pragmaticFunction } = w.tags;

        if (!pragmaticFunction) return;
        if (!whitelist.includes(pragmaticFunction)) return;

        const wordform = w.transcription.default.toLowerCase();
        const lexeme   = wordforms[wordform];

        if (!lexeme) return;

        w.stem = w.stem ?? lexeme; // eslint-disable-line no-param-reassign

      });

    });

    await writeJSON(filePath, text, { encoding: `utf8`, spaces: 2 });

  }, ignore);

}();
