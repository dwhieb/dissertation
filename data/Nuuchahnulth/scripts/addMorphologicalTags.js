/**
 * This script applies part-of-speech tags to the Nuuchahnulth corpus based on morphology
 */

/* eslint-disable
  max-nested-callbacks,
  no-param-reassign,
*/

import { fileURLToPath } from 'url';
import findAndReplace    from '../../../scripts/utilities/findAndReplace.js';
import glossMappingsData from './constants/glossMappings.js';
import path              from 'path';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

async function addMorphologicalTags() {

  const dataDir       = path.join(currentDir, `../texts`);
  const glossMappings = new Map(Object.entries(glossMappingsData));

  const options = {
    searchOnly: false,
    testRun:    false,
  };

  await findAndReplace(dataDir, utterance => {

    if (!utterance.words) return utterance;

    utterance.words = utterance.words.map(word => {

      if (!word.morphemes) return word;

      word.tags = word.tags ?? {};

      // Don't overwrite existing tags
      if (`function` in word.tags) return word;

      const POSTags = word.morphemes
      .map(({ gloss }) => glossMappings.get(gloss))
      .filter(Boolean);

      if (POSTags.includes(`PRED-REF`)) {
        word.tags.function = `PRED-REF`;
        return word;
      }

      if (POSTags.includes(`REF`)) {
        word.tags.function = `REF`;
        return word;
      }

      if (POSTags.includes(`PRED`)) {
        word.tags.function = `PRED`;
        return word;
      }

      return word;

    });

    return utterance;

  }, options);

}

addMorphologicalTags().catch(console.error);
