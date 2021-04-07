import getDispersions           from './getDispersions.js';
import getLexicalFlexibility    from './getLexicalFlexibility.js';
import getRelativeFrequencies   from './getRelativeFrequencies.js';
import getSmallestTextSize      from './getSmallestTextSize.js';

export default function getLexemeStats(corpusFrequencies, textsFrequencies, corpusSize, corpusFunctionFrequencies) {

  const smallestTextSize = getSmallestTextSize(textsFrequencies);

  corpusFrequencies.forEach((corpusStats, lexeme) => {
    getRelativeFrequencies(corpusStats, corpusSize);
    getDispersions(lexeme, corpusStats, textsFrequencies, smallestTextSize);
    getLexicalFlexibility(corpusStats, corpusFunctionFrequencies);
  });

  return corpusFrequencies;

}
