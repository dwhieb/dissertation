import { compare } from '../utilities/index.js';

/**
 * Accepts a CoNLL text as an array whose records are in JSON format and returns a Map object with raw frequencies of each wordform
 * @param  {Array} text An array of CoNLL records in JSON format
 * @return {Map}        A Map object with raw frequencies of each wordform
 */
export default function getWordformFrequencies(text) {

  const frequencies = text.reduce((map, { token }) => {
    token = token.toLowerCase(); // eslint-disable-line no-param-reassign
    if (map.has(token)) return map.set(token, map.get(token) + 1);
    return map.set(token, 1);
  }, new Map);

  const sortedEntries = [...frequencies.entries()]
  .sort(([wordA, freqA], [wordB, freqB]) => compare(freqB, freqA) || compare(wordA, wordB));

  return Object.fromEntries(sortedEntries);

}
