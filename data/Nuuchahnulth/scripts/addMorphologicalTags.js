/**
 * This script applies part-of-speech tags to the Nuuchahnulth corpus based on morphology
 */

/* eslint-disable
  max-nested-callbacks,
  no-param-reassign,
*/

import { fileURLToPath } from 'url';
import findAndReplace    from '../../../scripts/utilities/findAndReplace.js';
import glossTags         from './constants/glossTags.js';
import path              from 'path';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

async function addMorphologicalTags() {

  const dataDir = path.join(currentDir, `../texts`);
  const glosses = new Map(Object.entries(glossTags));

  const options = {
    searchOnly: false,
    testRun:    false,
  };

  await findAndReplace(dataDir, utterance => {

    if (!utterance.words) return utterance;

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
