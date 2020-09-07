/* eslint-disable
  no-param-reassign,
*/

export default function calculateDispersion(lexeme, corpusStats, textsFrequencies) {

  const differences = Array.from(textsFrequencies.entries())
  .reduce((diffs, [filename, textStats]) => {

    // lexemeFrequencies = the text-relative frequencies for each lexeme
    // expectedFrequency = the expected relative frequency for this text
    const { lexemeFrequencies, relativeSize: expectedFrequency } = textStats;

    // lexemeStats = corpus-level stats for this lexeme
    const lexemeStats = lexemeFrequencies.get(lexeme) ?? {
      frequency: 0,
      MOD:       0,
      PRED:      0,
      REF:       0,
    };

    const textDiffs = {};

    // actualFrequency = the actual text frequency of the lexeme, relative to its corpus frequency
    const actualFrequency = lexemeStats.frequency / corpusStats.frequency;
    textDiffs.all = Math.abs(expectedFrequency - actualFrequency);

    if (corpusStats.MOD) {
      const actualFrequencyMOD = lexemeStats.MOD / corpusStats.MOD;
      textDiffs.MOD = Math.abs(expectedFrequency - actualFrequencyMOD);
    }

    if (corpusStats.PRED) {
      const actualFrequencyPRED = lexemeStats.PRED / corpusStats.PRED;
      textDiffs.PRED = Math.abs(expectedFrequency - actualFrequencyPRED);
    }

    if (corpusStats.REF) {
      const actualFrequencyREF = lexemeStats.REF / corpusStats.REF;
      textDiffs.REF = Math.abs(expectedFrequency - actualFrequencyREF);
    }

    return diffs.set(filename, textDiffs);

  }, new Map);

  // get sum of the absolute differences calculated above
  const sumDifferences = Array.from(differences.values())
  .reduce((sums, counts) => {

    sums.all += counts.all;

    if (counts.MOD) sums.MOD += counts.MOD;
    if (counts.PRED) sums.PRED += counts.PRED;
    if (counts.REF) sums.REF += counts.REF;

    return sums;

  }, {
    all:  0,
    MOD:  0,
    PRED: 0,
    REF:  0,
  });

  corpusStats.dispersion     = sumDifferences.all / 2;
  corpusStats.dispersionMOD  = (sumDifferences.MOD / 2) || 1;
  corpusStats.dispersionPRED = (sumDifferences.PRED / 2) || 1;
  corpusStats.dispersionREF  = (sumDifferences.REF / 2) || 1;

}
