import getDispersions         from './getDispersions.js';
import getFunctionalDiversity from './getFunctionalDiversity.js';
import getRelativeFrequencies from './getRelativeFrequencies.js';
import getSmallestTextSize    from './getSmallestTextSize.js';

export default function getLexemeStats(corpusFrequencies, textsFrequencies, corpusSize, corpusFunctionFrequencies) {

  const smallestTextSize = getSmallestTextSize(textsFrequencies);

  corpusFrequencies.forEach((corpusStats, lexeme) => {
    getRelativeFrequencies(corpusStats, corpusSize);
    getDispersions(lexeme, corpusStats, textsFrequencies, smallestTextSize);
    getFunctionalDiversity(corpusStats, corpusFunctionFrequencies);
  });

  return corpusFrequencies;

}
