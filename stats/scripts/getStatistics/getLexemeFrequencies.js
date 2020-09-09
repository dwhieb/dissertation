export default function getCorpusFrequencies(textsInfo) {

  const corpusLexemeFrequencies = new Map;

  textsInfo.forEach(({ lexemeFrequencies: textLexemeFrequencies }) => {

    textLexemeFrequencies.forEach((textStats, lexeme) => {

      const corpusStats = corpusLexemeFrequencies.get(lexeme) ?? {
        frequency: 0,
        GER:       0,
        INF:       0,
        MOD:       0,
        PRED:      0,
        PREDCXN:   0,
        REF:       0,
      };

      corpusStats.gloss      = textStats.gloss;
      corpusStats.frequency += textStats.frequency;
      corpusStats.GER       += textStats.GER;
      corpusStats.INF       += textStats.INF;
      corpusStats.MOD       += textStats.MOD;
      corpusStats.PRED      += textStats.PRED;
      corpusStats.PREDCXN   += textStats.PREDCXN;
      corpusStats.REF       += textStats.REF;

      corpusLexemeFrequencies.set(lexeme, corpusStats);

    });

  });

  return corpusLexemeFrequencies;

}
