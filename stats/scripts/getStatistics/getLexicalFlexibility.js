/* eslint-disable
  no-param-reassign,
*/

import getRelativeEntropy from './getRelativeEntropy.js';

export default function getLexicalFlexibility(corpusStats) {

  const {
    REF,
    PRED,
    MOD,
    REFbroad,
    PREDbroad,
  } = corpusStats;

  const frequencies      = [REF, PRED, MOD];
  const frequenciesBroad = [REFbroad, PREDbroad, MOD];

  corpusStats.flexibility      = getRelativeEntropy(frequencies);
  corpusStats.flexibilityBroad = getRelativeEntropy(frequenciesBroad);

  if (Number.isNaN(corpusStats.flexibility)) {
    corpusStats.flexibility = 0;
  }

}
