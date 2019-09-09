import { aggregate } from '../utilities/index.js';

/**
 * The columns to use at the top of the resulting TSV file
 * @type {Array}
 */
const columns = [
  `lexeme`,
  `frequency`,
];

/**
 * Aggregator function used to generate the list of lexeme frequencies
 * @param  {Map}    frequencies A map of lexeme frequencies
 * @param  {String} POS         The part of speech for the word token
 * @param  {String} lemma       The lemma for the word token
 */
function aggregateLexemes(frequencies, { POS, lemma }) {

  const lexeme = `${lemma}_${POS}`;

  if (frequencies.has(lexeme)) frequencies.set(lexeme, frequencies.get(lexeme) + 1);
  else frequencies.set(lexeme, 1);

}

/**
* Generates a list of lexemes and their frequencies based on a data directory
 * @param  {String}  dir        The path to the data directory
 * @param  {String}  outputPath The path to the file to save the results in
 * @return {Promise}
 */
export default function generateLexemes(dir, outputPath) {
  return aggregate(dir, outputPath, aggregateLexemes, columns);
}
