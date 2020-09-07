import getDispersions      from './getDispersions.js';
import getSmallestTextSize from './getSmallestTextSize.js';

export default function getLexemeStats(corpusFrequencies, textsFrequencies) {

  const smallestTextSize = getSmallestTextSize(textsFrequencies);

  corpusFrequencies.forEach((corpusStats, lexeme) => getDispersions(lexeme, corpusStats, textsFrequencies, smallestTextSize));

  return corpusFrequencies;

}
