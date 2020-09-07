import calculateDispersion from './calculateDispersion.js';

export default function getLexemeStats(corpusFrequencies, textsFrequencies) {
  corpusFrequencies.forEach((corpusStats, lexeme) => calculateDispersion(lexeme, corpusStats, textsFrequencies));
  return corpusFrequencies;
}
