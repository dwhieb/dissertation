/**
 * This script generates a list of all the unique grammatical glosses in the Nuuchahnulth corpus and prints it to the console
 */

/* eslint-disable
  max-nested-callbacks,
*/

import findAndReplace from '../../../scripts/utilities/findAndReplace.js';

void async function getGlosses() {

  let glosses = new Set;

  await findAndReplace(({ words }) => {

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
