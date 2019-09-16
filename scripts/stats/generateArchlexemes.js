import {
  aggregate,
  isMajorCategory,
} from '../utilities/index.js';

/**
 * The columns to use at the top of the resulting TSV file
 * @type {Array}
 */
const columns = [
  `archlexeme`,
  `frequency`,
];

/**
 * Aggregator function used to generate the list of archlexeme frequencies
 * @param  {Map}    frequencies A Map of archlexeme frequencies
 * @param  {String} lemma       The lemma for the word token
 */
function aggregateArchlexemes(frequencies, { lemma, POS }) {
  // NB: Comment out the following line to calculate archlexeme frequencies based on all word classes
  if (!isMajorCategory(POS)) return;
  if (frequencies.has(lemma)) frequencies.set(lemma, frequencies.get(lemma) + 1);
  else frequencies.set(lemma, 1);
}

/**
 * Generates a list of archlexemes and their frequencies based on a data directory
 * @param  {String}  dir        The path to the data directory
 * @param  {String}  outputPath The path to the file to save the results in
 * @return {Promise}
 */
export default function generateArchlexemes(dir, outputPath) {
  return aggregate(dir, outputPath, aggregateArchlexemes, columns);
}
