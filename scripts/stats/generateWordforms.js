import { aggregate } from '../utilities/index.js';

/**
 * Column names for the generated CSV file
 * @type {Array}
 */
const columns = [
  `wordform`,
  `frequency`,
];

/**
 * Aggregator function used to generate the list of lexeme frequencies
 * @param  {Map}    frequencies A map of lexeme frequencies
 * @param  {String} POS         The part of speech for the word token
 * @param  {String} lemma       The lemma for the word token
 */
function aggregateWordforms(frequencies, { POS, token }) {

  const wordform = `${token.toLowerCase()}_${POS}`;

  if (frequencies.has(wordform)) frequencies.set(wordform, frequencies.get(wordform) + 1);
  else frequencies.set(wordform, 1);

}

/**
* Generates a list of lexemes and their frequencies based on a data directory
 * @param  {String}  dir        The path to the data directory
 * @param  {String}  outputPath The path to the file to save the results in
 * @return {Promise}
 */
export default function generateWordforms(dir, outputPath) {
  return aggregate(dir, outputPath, aggregateWordforms, columns);
}
