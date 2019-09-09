import compare from './compare.js';

/**
 * Accepts a Map of items to their frequencies and converts it to a JSON array sorted by frequency
 * @param  {Map}   map A Map of items to their frequencies
 * @return {Array}     Returns an array of entries (array of arrays)
 */
export default function convertFrequencies(map) {
  return [...map.entries()]
  .sort(([wordA, freqA], [wordB, freqB]) => compare(freqB, freqA) || compare(wordA, wordB));
}
