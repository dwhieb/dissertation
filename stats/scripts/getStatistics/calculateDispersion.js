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

    // actualFrequency = the actual text frequency of the lexeme, relative to its corpus frequency
    const actualFrequency     = lexemeStats.frequency / corpusStats.frequency;
    const difference          = Math.abs(expectedFrequency - actualFrequency);

    const actualFrequencyMOD  = lexemeStats.MOD / (corpusStats.MOD || 1);
    const differenceMOD       = Math.abs(expectedFrequency - actualFrequencyMOD);

    const actualFrequencyPRED = lexemeStats.PRED / (corpusStats.PRED || 1);
    const differencePRED      = Math.abs(expectedFrequency - actualFrequencyPRED);

    const actualFrequencyREF  = lexemeStats.REF / (corpusStats.REF || 1);
    const differenceREF       = Math.abs(expectedFrequency - actualFrequencyREF);

    return diffs.set(filename, {
      difference,
      differenceMOD,
      differencePRED,
      differenceREF,
    });

  }, new Map);

  // get sum of the absolute differences calculated above
  const sumDifferences = Array.from(differences.values())
  .reduce((sums, counts) => {
    sums.all  += counts.difference;
    sums.MOD  += counts.differenceMOD;
    sums.PRED += counts.differencePRED;
    sums.REF  += counts.differenceREF;
    return sums;
  }, {
    all:  0,
    MOD:  0,
    PRED: 0,
    REF:  0,
  });

  corpusStats.dispersion     = sumDifferences.all / 2;
  corpusStats.dispersionMOD  = sumDifferences.MOD / 2;
  corpusStats.dispersionPRED = sumDifferences.PRED / 2;
  corpusStats.dispersionREF  = sumDifferences.REF / 2;

}
