// if the gloss consists of nothing but uppercase letters, numbers, and periods
// remove it from the array; the remaining morphemes constitute the stem;
// reconstruct the stem from the morphemes by concatenating the array (via reduce?)

/**
 * This script lemmatizes each token in the corpus, assigning it to a stem.
 */

/* eslint-disable
  max-nested-callbacks,
  no-param-reassign,
*/

import { fileURLToPath }   from 'url';
import findAndReplace      from '../../../scripts/utilities/findAndReplace.js';
import grammaticalGlosses from './constants/grammaticalGlosses.js';
import path                from 'path';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir    = path.join(currentDir, `../texts`);

const grammaticalGlossRegExp = /^[A-Z123.]+$/u;

findAndReplace(dataDir, utterance => {

  if (!utterance?.words?.length) return utterance;

  utterance.words.forEach(word => {

    if (!word?.morphemes?.length) return;

    const morphemes = [...word.morphemes];

    // remove reduplicated morpheme if present
    const redupIndex = morphemes.findIndex(m => m.transcription.default.includes(`DUP`));
    if (redupIndex) morphemes.splice(redupIndex, 1);

    // assign word root and gloss
    word.root = morphemes[0].transcription.default;
    if (!word.stemGloss) word.stemGloss = word.gloss.eng;

    // remove ƛa· 'also/again'
    const hasAlsoMorpheme = morphemes[morphemes.length - 1].transcription.default === `ƛa·`;
    if (hasAlsoMorpheme) morphemes.pop();

    // if stem has 1 morpheme, assign it
    if (morphemes.length === 1) {
      word.stem = morphemes[0].gloss.eng;
      return;
    }

    // if stem ends in lexical morpheme, assign stem
    const lastMorpheme          = morphemes[morphemes.length - 1];
    const isGrammaticalMorpheme = grammaticalGlossRegExp.test(lastMorpheme.gloss.eng);

    if (!isGrammaticalMorpheme) {
      word.stem = morphemes.map(m => m.gloss.eng).join(`-`);
      return;
    }

    // remove non-aspectual grammatical morphemes
    const [stemEndIndex] = morphemes
    .map((m, i) => [i, m])
    .filter(([, m]) => !grammaticalGlosses.includes(m.gloss.eng))
    .pop() || [-1];

    morphemes.splice(stemEndIndex);

    // assign stem
    word.stem = morphemes.map(m => m.gloss.eng).join(`-`);

  });

  return utterance;

}, { searchOnly: false, testRun: false })
.catch(e => {
  throw e;
});
