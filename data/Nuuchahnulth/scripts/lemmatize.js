// if the gloss consists of nothing but uppercase letters, numbers, and periods
// remove it from the array; the remaining morphemes constitute the stem;
// reconstruct the stem from the morphemes by concatenating the array (via reduce?)

/**
 * This script lemmatizes each token in the corpus, assigning it to a stem.
 */

/* eslint-disable
  max-len,
  max-nested-callbacks,
  no-param-reassign,
  no-undefined,
*/

import { fileURLToPath } from 'url';
import findAndReplace    from '../../../scripts/utilities/findAndReplace.js';
import path              from 'path';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir    = path.join(currentDir, `../texts`);

findAndReplace(dataDir, utterance => {

  if (!utterance.words) return utterance;

  utterance.words.forEach(word => {

    if (!word?.morphemes?.length) return;

    const grammaticalGlossRegExp = /^[A-Z123.]+$/u;

    const morphemeTypes = word.morphemes
    .map(morpheme => (grammaticalGlossRegExp.test(morpheme.gloss.eng) ? null : morpheme.gloss));

    // start at index 1 so as to skip any reduplication morphemes at the start of the word
    let firstGrammaticalMorphemeIndex = morphemeTypes.indexOf(null, 1);
    firstGrammaticalMorphemeIndex     = firstGrammaticalMorphemeIndex === -1 ? undefined : firstGrammaticalMorphemeIndex;

    const lexicalMorphemes = word.morphemes
    .slice(0, firstGrammaticalMorphemeIndex);

    if (morphemeTypes[0] === null) lexicalMorphemes.shift();

    if (lexicalMorphemes.length) {

      word.root = lexicalMorphemes[0].transcription.default;

      word.stem = lexicalMorphemes
      .map(morpheme => morpheme.transcription.default)
      .join(`-`);

    }

  });

  return utterance;

}, { searchOnly: false, testRun: false })
.catch(e => {
  throw e;
});
