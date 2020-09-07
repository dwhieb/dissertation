export default function getCorpusFrequencies(textsInfo) {

  const corpusLexemeFrequencies = new Map;

  textsInfo.forEach(({ lexemeFrequencies: textLexemeFrequencies }) => {

    textLexemeFrequencies.forEach((textStats, lexeme) => {

      const corpusStats = corpusLexemeFrequencies.get(lexeme) ?? {
        frequency: 0,
        MOD:       0,
        PRED:      0,
        REF:       0,
      };

      corpusStats.frequency += textStats.frequency;
      corpusStats.REF       += textStats.REF;
      corpusStats.PRED      += textStats.PRED;
      corpusStats.MOD       += textStats.MOD;

      corpusLexemeFrequencies.set(lexeme, corpusStats);

    });

  });

  return corpusLexemeFrequencies;

}
