/**
 * This script applies part-of-speech tags to the Nuuchahnulth corpus based on morphology
 */

/* eslint-disable
  max-nested-callbacks,
  no-param-reassign,
*/

import findAndReplace from '../../../scripts/utilities/findAndReplace.js';
import glossTags      from './constants/glossTags.js';

const glosses = new Map(Object.entries(glossTags));

void async function addMorphologicalTags() {

  const options = {
    searchOnly: false,
    testRun:    true,
  };

  await findAndReplace(({ words }) => {

    if (!words) return;

    words.forEach(word => {

      word.tags = {};

      if (!word.morphemes) return;

      if (!Array.isArray(word.morphemes)) {
        console.log(word.morphemes);
      }

      const tags = words.morphemes.map(({ gloss }) => glosses.get(gloss));

      if (tags.includes(`PRED-REF`)) {
        word.tags.morphPOS = `PRED-REF`;
        return;
      }

      if (tags.include(`REF`)) {
        word.tags.morphPOS = `REF`;
        return;
      }

      if (tags.includes(`PRED`)) {
        word.tags.morphPOS = `PRED`;
      }

    });

  }, options);


}();
