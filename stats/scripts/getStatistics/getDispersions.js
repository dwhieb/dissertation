/* eslint-disable
  max-statements,
  no-param-reassign,
  sort-keys,
*/

import getDPNorm from './getDPNorm.js';

export default function getDispersions(lexeme, corpusStats, textsFrequencies, smallestTextSize) {

  const differences = Array.from(textsFrequencies.entries())
  .reduce((diffs, [filename, textStats]) => {

    // lexemeFrequencies = the text-relative frequencies for each lexeme
    // expectedFrequency = the expected relative frequency for this text
    const { lexemeFrequencies, relativeSize: expectedFrequency } = textStats;

    // lexemeStats = corpus-level stats for this lexeme
    const lexemeStats = lexemeFrequencies.get(lexeme) ?? {
      frequency: 0,
      GER:       0,
      INF:       0,
      MOD:       0,
      PRED:      0,
      PREDCXN:   0,
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

    // calculate dispersion for expanded definition of predicate
    const lexemeFrequencyPREDbroad = lexemeStats.PRED + lexemeStats.PREDCXN;
    const corpusFrequencyPREDbroad = corpusStats.PRED + corpusStats.PREDCXN;
    const actualFrequencyPREDbroad = lexemeFrequencyPREDbroad / corpusFrequencyPREDbroad;
    textDiffs.PREDbroad = Math.abs(expectedFrequency - actualFrequencyPREDbroad);

    // calculate dispersion for expanded definition of referent
    const lexemeFrequencyREFbroad = lexemeStats.REF + lexemeStats.GER + lexemeStats.INF;
    const corpusFrequencyREFbroad = corpusStats.REF + corpusStats.GET + corpusStats.INF;
    const actualFrequencyREFbroad = lexemeFrequencyREFbroad / corpusFrequencyREFbroad;
    textDiffs.REFbroad = Math.abs(expectedFrequency - actualFrequencyREFbroad);

    return diffs.set(filename, textDiffs);

  }, new Map);

  // get sum of the absolute differences calculated above
  const sumDifferences = Array.from(differences.values())
  .reduce((sums, counts) => {

    sums.all += counts.all;

    if (counts.MOD) sums.MOD += counts.MOD;
    if (counts.PRED) sums.PRED += counts.PRED;
    if (counts.REF) sums.REF += counts.REF;

    sums.PREDbroad += counts.PREDbroad;
    sums.REFbroad  += counts.REFbroad;

    return sums;

  }, {
    all:       0,
    MOD:       0,
    PRED:      0,
    PREDbroad: 0,
    REF:       0,
    REFbroad:  0,
  });

  const dispersion          = sumDifferences.all / 2;
  const dispersionMOD       = (sumDifferences.MOD / 2) || 1;
  const dispersionPRED      = (sumDifferences.PRED / 2) || 1;
  const dispersionREF       = (sumDifferences.REF / 2) || 1;
  const dispersionPREDbroad = (sumDifferences.PREDbroad / 2) || 1;
  const dispersionREFbroad  = (sumDifferences.REFbroad / 2) || 1;
  const dispersionNorm      = getDPNorm(dispersion, smallestTextSize);
  const dispersionMODNorm   = getDPNorm(dispersionMOD, smallestTextSize);
  const dispersionPREDNorm  = getDPNorm(dispersionPRED, smallestTextSize);
  const dispersionREFNorm   = getDPNorm(dispersionREF, smallestTextSize);

  Object.assign(corpusStats, {
    dispersion,
    dispersionMOD,
    dispersionPRED,
    dispersionREF,
    dispersionPREDbroad,
    dispersionREFbroad,
    dispersionNorm,
    dispersionMODNorm,
    dispersionPREDNorm,
    dispersionREFNorm,
  });

}
