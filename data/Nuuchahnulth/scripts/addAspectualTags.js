/**
 * This script tags each token in the Nuuchahnulth corpus for its morphological aspect.
 */

/* eslint-disable
  max-nested-callbacks,
  no-param-reassign,
*/

import aspectualMappingsData from './constants/aspectualGlossMappings.js';
import { fileURLToPath }     from 'url';
import findAndReplace        from '../../../scripts/utilities/findAndReplace.js';
import path                  from 'path';

const glossMappings = new Map(Object.entries(aspectualMappingsData));
const currentDir    = path.dirname(fileURLToPath(import.meta.url));
const dataDir       = path.join(currentDir, `../texts`);

async function addAspectualTags() {

  const options = {
    searchOnly: false,
    testRun:    true,
  };

  await findAndReplace(dataDir, utterance => {

    if (!utterance.words?.length) return utterance;

    utterance.words.forEach(word => {

      if (!word.morphemes?.length) return;

      word.tags = word.tags ?? {};

      const glosses = word.morphemes.map(({ gloss }) => gloss.eng);

      word.tags.aspect = glosses.reduceRight((asp, gloss) => {

        if (asp) return asp;

        if (glossMappings.has(gloss)) {
          asp = glossMappings.get(gloss);
        }

        return asp;

      }, null);

    });

    return utterance;

  }, options);

}

addAspectualTags().catch(console.error);
