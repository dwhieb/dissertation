/**
 * This script generates a list of all the unique grammatical glosses in the Nuuchahnulth corpus and prints it to the console
 */

/* eslint-disable
  max-nested-callbacks,
*/

import { fileURLToPath } from 'url';
import findAndReplace    from '../../../scripts/utilities/findAndReplace.js';
import path              from 'path';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

void async function getGlosses() {

  const dataDir = path.join(currentDir, `../texts`);
  let   glosses = new Set;

  await findAndReplace(dataDir, ({ words }) => {

    if (!words) return;

    words.forEach(({ morphemes }) => {

      if (!morphemes) return;

      morphemes.forEach(({ gloss }) => glosses.add(gloss));

    });

  }, { searchOnly: true });

  glosses = Array.from(glosses)
  .filter(gloss => /[A-Z]{2}/u.test(gloss))
  .filter(gloss => !gloss.includes(`[`))
  .sort();

  console.info(JSON.stringify(glosses, null, 2));

}();
