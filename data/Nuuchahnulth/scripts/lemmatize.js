// if the gloss consists of nothing but uppercase letters, numbers, and periods
// remove it from the array; the remaining morphemes constitute the stem;
// reconstruct the stem from the morphemes by concatenating the array (via reduce?)

/**
 * This script lemmatizes each token in the corpus, assigning it to a stem.
 */

/* eslint-disable
  max-nested-callbacks,
  max-statements,
  no-param-reassign,
*/

import { fileURLToPath }  from 'url';
import findAndReplace     from '../../../scripts/utilities/findAndReplace.js';
import grammaticalGlosses from './constants/grammaticalGlosses.js';
import path               from 'path';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir    = path.join(currentDir, `../texts`);

const grammaticalGlossRegExp = /^[A-Z123.]+$/u;

function getStem(morphemes) {
  return morphemes.map(m => m.transcription.default).join(`-`);
}

function getStemGloss(morphemes) {
  return morphemes.map(m => m.gloss.eng).join(`-`);
}

findAndReplace(dataDir, utterance => {

  if (!utterance?.words?.length) return utterance;

  utterance.words.forEach(word => {

    if (!word?.morphemes?.length) return;

    const morphemes = [...word.morphemes];

    // remove reduplicated morpheme if present
    const redupIndex = morphemes.findIndex(m => m.transcription.default.includes(`DUP`));
    if (redupIndex !== -1) morphemes.splice(redupIndex, 1);

    // assign word root
    word.root = morphemes[0].transcription.default;

    let lastMorpheme = morphemes[morphemes.length - 1];

    // remove ‑ƛa· 'also/again'
    const hasAlsoMorpheme = lastMorpheme.transcription.default === `ƛa·`;
    if (hasAlsoMorpheme) morphemes.pop();

    // remove ‑ʔaːɬ 'always'
    const hasAlwaysMorpheme = lastMorpheme.transcription.default === `ʔaːɬ`;
    if (hasAlwaysMorpheme) morphemes.pop();

    // remove ‑sa 'really'
    const hasReallyMorpheme = lastMorpheme.transcription.default === `sa`;
    if (hasReallyMorpheme) morphemes.pop();

    // remove ‑ča 'maybe'
    const hasMaybeMorpheme = lastMorpheme.transcription.default === `ča`;
    if (hasMaybeMorpheme) morphemes.pop();

    // if stem has 1 morpheme, assign it
    if (morphemes.length === 1) {
      word.stem      = getStem(morphemes);
      word.stemGloss = getStemGloss(morphemes);
      return;
    }

    // if stem ends in lexical morpheme, assign stem
    lastMorpheme                = morphemes[morphemes.length - 1];
    const isGrammaticalMorpheme = grammaticalGlossRegExp.test(lastMorpheme.gloss.eng);

    if (!isGrammaticalMorpheme) {
      word.stem      = getStem(morphemes);
      word.stemGloss = getStemGloss(morphemes);
      return;
    }

    // remove non-aspectual grammatical morphemes
    const [stemEndIndex] = morphemes
    .map((m, i) => [i, m])
    .filter(([, m]) => !grammaticalGlosses.includes(m.gloss.eng))
    .pop() || [-1];

    morphemes.splice(stemEndIndex + 1);

    // assign stem
    word.stem      = getStem(morphemes);
    word.stemGloss = getStemGloss(morphemes);

  });

  return utterance;

}, { searchOnly: false, testRun: false })
.catch(e => {
  throw e;
});
