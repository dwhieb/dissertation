export default function getCorpusFrequencies(textsInfo) {

  const corpusLexemeFrequencies = new Map;

  textsInfo.forEach(({ lexemeFrequencies: textLexemeFrequencies }) => {

    textLexemeFrequencies.forEach((textStats, lexeme) => {

      const corpusStats = corpusLexemeFrequencies.get(lexeme) ?? {
        definite:  0,
        frequency: 0,
        GER:       0,
        INF:       0,
        MOD:       0,
        PRED:      0,
        PREDbroad: 0,
        PREDCXN:   0,
        REF:       0,
        REFbroad:  0,
      };

      corpusStats.aspect     = textStats.aspect;
      corpusStats.definite  += textStats.definite;
      corpusStats.gloss      = textStats.gloss;
      corpusStats.frequency += textStats.frequency;
      corpusStats.GER       += textStats.GER;
      corpusStats.INF       += textStats.INF;
      corpusStats.MOD       += textStats.MOD;
      corpusStats.PRED      += textStats.PRED;
      corpusStats.PREDbroad += textStats.PREDbroad;
      corpusStats.PREDCXN   += textStats.PREDCXN;
      corpusStats.REF       += textStats.REF;
      corpusStats.REFbroad  += textStats.REFbroad;

      corpusLexemeFrequencies.set(lexeme, corpusStats);

    });

  });

  return corpusLexemeFrequencies;

}
