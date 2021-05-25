export default function getCorpusFunctionFrequencies(textsStats) {

  const corpusFunctionFrequencies = {
    MOD:  0,
    PRED: 0,
    REF:  0,
  };

  textsStats.forEach(({ lexemeFrequencies }) => {
    lexemeFrequencies.forEach(({ REF, PRED, MOD }) => {
      corpusFunctionFrequencies.REF += REF;
      corpusFunctionFrequencies.PRED += PRED;
      corpusFunctionFrequencies.MOD += MOD;
    });
  });

  return corpusFunctionFrequencies;

}
