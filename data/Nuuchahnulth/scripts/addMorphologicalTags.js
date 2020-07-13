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

async function addMorphologicalTags() {

  const options = {
    searchOnly: false,
    testRun:    true,
  };

  await findAndReplace(utterance => {

    if (!utterance.words) return;

    utterance.words = utterance.words.map(word => {

      word.tags = {};

      if (!word.morphemes) return word;

      const tags = word.morphemes
      .map(({ gloss }) => glosses.get(gloss))
      .filter(Boolean);

      if (tags.includes(`PRED-REF`)) {
        word.tags.morphPOS = `PRED-REF`;
        return word;
      }

      if (tags.includes(`REF`)) {
        word.tags.morphPOS = `REF`;
        return word;
      }

      if (tags.includes(`PRED`)) {
        word.tags.morphPOS = `PRED`;
        return word;
      }

      return word;

    });

    return utterance;

  }, options);

}

addMorphologicalTags().catch(console.error);
