/* eslint-disable
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
      PREDbroad: 0,
      PREDCXN:   0,
      REF:       0,
      REFbroad:  0,
    };

    const textDiffs = {};

    // actualFrequency = the actual text frequency of the lexeme, relative to its corpus frequency
    const actualFrequency = lexemeStats.frequency / corpusStats.frequency;
    textDiffs.all = Math.abs(expectedFrequency - actualFrequency);

    const actualFrequencyMOD = lexemeStats.MOD / corpusStats.MOD;
    textDiffs.MOD = Math.abs(expectedFrequency - actualFrequencyMOD);

    const actualFrequencyPRED = lexemeStats.PRED / corpusStats.PRED;
    textDiffs.PRED = Math.abs(expectedFrequency - actualFrequencyPRED);

    const actualFrequencyREF = lexemeStats.REF / corpusStats.REF;
    textDiffs.REF = Math.abs(expectedFrequency - actualFrequencyREF);

    // calculate dispersion for expanded definition of predicate
    const actualFrequencyPREDbroad = lexemeStats.PREDbroad / corpusStats.PREDbroad;
    textDiffs.PREDbroad = Math.abs(expectedFrequency - actualFrequencyPREDbroad);

    // calculate dispersion for expanded definition of referent
    const actualFrequencyREFbroad = lexemeStats.REFbroad / corpusStats.REFbroad;
    textDiffs.REFbroad = Math.abs(expectedFrequency - actualFrequencyREFbroad);

    return diffs.set(filename, textDiffs);

  }, new Map);

  // get sum of the absolute differences calculated above
  const sumDifferences = Array.from(differences.values())
  .reduce((sums, counts) => {

    sums.all       += counts.all;
    sums.MOD       += counts.MOD;
    sums.PRED      += counts.PRED;
    sums.REF       += counts.REF;
    sums.PREDbroad += counts.PREDbroad;
    sums.REFbroad  += counts.REFbroad;

    return sums;

  }, {
    all:       0,
    MOD:       0,
    PRED:      0,
    REF:       0,
    PREDbroad: 0,
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
