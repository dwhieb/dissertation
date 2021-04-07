import getRelativeEntropy from './getRelativeEntropy.js';

export default function getLexicalFlexibility(lexemeStats, corpusFunctionFrequencies) {

  const {
    REF,
    PRED,
    MOD,
    REFbroad,
    PREDbroad,
  } = lexemeStats;

  const frequencies      = [REF, PRED, MOD];
  const frequenciesBroad = [REFbroad, PREDbroad, MOD];

  lexemeStats.flexibility      = getRelativeEntropy(frequencies);
  lexemeStats.flexibilityBroad = getRelativeEntropy(frequenciesBroad);

  lexemeStats.normalizedREF  = (lexemeStats.REF * 100) / corpusFunctionFrequencies.REF;
  lexemeStats.normalizedPRED = (lexemeStats.PRED * 100) / corpusFunctionFrequencies.PRED;
  lexemeStats.normalizedMOD  = (lexemeStats.MOD * 100) / corpusFunctionFrequencies.MOD;

  lexemeStats.normalizedFlexibility = getRelativeEntropy([
    lexemeStats.normalizedREF,
    lexemeStats.normalizedPRED,
    lexemeStats.normalizedMOD,
  ]);

  if (Number.isNaN(lexemeStats.normalizedFlexibility)) {
    lexemeStats.normalizedFlexibility = 0;
  }

  if (Number.isNaN(lexemeStats.flexibility)) {
    lexemeStats.flexibility = 0;
  }

  if (Number.isNaN(lexemeStats.flexibilityBroad)) {
    lexemeStats.flexibilityBroad = 0;
  }

}
