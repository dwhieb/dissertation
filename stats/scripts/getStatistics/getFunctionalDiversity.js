import getRelativeEntropy from './getRelativeEntropy.js';

export default function getFunctionalDiversity(lexemeStats, corpusFunctionFrequencies) {

  const {
    REF,
    PRED,
    MOD,
    REFbroad,
    PREDbroad,
  } = lexemeStats;

  const frequencies      = [REF, PRED, MOD];
  const frequenciesBroad = [REFbroad, PREDbroad, MOD];

  lexemeStats.diversity      = getRelativeEntropy(frequencies);
  lexemeStats.diversityBroad = getRelativeEntropy(frequenciesBroad);

  lexemeStats.normalizedREF  = (lexemeStats.REF * 100) / corpusFunctionFrequencies.REF;
  lexemeStats.normalizedPRED = (lexemeStats.PRED * 100) / corpusFunctionFrequencies.PRED;
  lexemeStats.normalizedMOD  = (lexemeStats.MOD * 100) / corpusFunctionFrequencies.MOD;

  lexemeStats.normalizedDiversity = getRelativeEntropy([
    lexemeStats.normalizedREF,
    lexemeStats.normalizedPRED,
    lexemeStats.normalizedMOD,
  ]);

  if (Number.isNaN(lexemeStats.normalizedDiversity)) {
    lexemeStats.normalizedDiversity = 0;
  }

  if (Number.isNaN(lexemeStats.diversity)) {
    lexemeStats.diversity = 0;
  }

  if (Number.isNaN(lexemeStats.diversityBroad)) {
    lexemeStats.diversityBroad = 0;
  }

}
