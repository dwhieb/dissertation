/**
 * This script calculates the portion of the texts which have morphological part-of-speech tags,
 * based on number of tokens
 */

/* eslint-disable
  max-nested-callbacks,
*/

import { fileURLToPath } from 'url';
import findAndReplace    from '../../../scripts/utilities/findAndReplace.js';
import path              from 'path';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

void async function calculateCoverage() {

  const dataDir = path.join(currentDir, `../texts`);
  let numTokens = 0;
  let numTagged = 0;

  await findAndReplace(dataDir, utterance => {

    if (!utterance?.words) return;

    utterance.words.forEach(word => {

      numTokens++;

      if (word.tags.morphPOS) numTagged++;

    });

  }, { searchOnly: true });

  const formatter = new Intl.NumberFormat(`en-US`, { style: `percent` });
  const coverage  = formatter.format(numTagged / numTokens);

  console.info(`Total tokens: ${numTokens}`);
  console.info(`Tagged tokens: ${numTagged}`);
  console.info(`Coverage: ${coverage}`);

}();
