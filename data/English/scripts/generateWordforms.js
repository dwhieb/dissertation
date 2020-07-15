import createSpinner     from 'ora';
import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import path              from 'path';
import processDir        from '../../../scripts/utilities/processDir.js';
import YAML              from 'yaml';

const {
  readFile,
  readJSON,
  writeJSON,
} = fs;

const badCharsRegExp = /[^A-Za-z]/u;
const currentDir     = path.dirname(fileURLToPath(import.meta.url));

/**
 * Increments the frequency of a word token in a frequency Map
 * @param  {Object} word        A DLx Word Token object
 * @param  {Map}    frequencies A Map of wordforms to their frequencies
 */
function countToken({ transcription }, frequencies) {

  const wordform = transcription.toLowerCase();

  if (frequencies.has(wordform)) frequencies.set(wordform, frequencies.get(wordform) + 1);
  else frequencies.set(wordform, 1);

}

function hasBadChars(string) {
  return badCharsRegExp.test(string);
}

/**
 * Ignore method which tells recursive-readdir to ignore any non-JSON files
 */
function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

/**
 * Generates a tab-delimited file of raw frequencies and dispersions for each wordform in the corpus
 * @param  {String}   dataDir        The directory of JSON files to calculate frequencies for
 * @param  {String}   outputPath     The path to the file to generate
 * @param  {Function} filterFunction A filter function which accepts a DLx Word Token, and returns true to keep the word, false otherwise. Excluded words will be included in frequency counts, but not the final list of generated wordforms.
 * @return {Promise}
 */
export default async function generateWordforms(dataDir, outputPath) {

  const spinner = createSpinner(`Calculating raw frequencies of wordforms`).start();

  const corpusWordforms = new Map;
  const texts           = new Map;
  let   corpusSize      = 0;

  const nonLexicalTagsPath = path.join(currentDir, `./constants/nonLexicalTags.yml`);
  const nonLexicalTagsYAML = await readFile(nonLexicalTagsPath, `utf8`);
  const nonLexicalTags     = YAML.parse(nonLexicalTagsYAML);

  const blacklistPath      = path.join(currentDir, `./constants/blacklist.yml`);
  const blacklistYAML      = await readFile(blacklistPath, `utf8`);
  const blacklist          = YAML.parse(blacklistYAML);

  /**
   * A filter function which accepts a DLx Word Token object for a word in English,
   * and returns true if the token should be included in the wordforms list,
   * false otherwise.
   * @param  {Word}    word A DLx Word Token object for an English word token
   * @return {Boolean}
   */
  const isGoodToken = ({ tags: { Penn }, transcription }) => {
    if (blacklist.includes(transcription)) return false;
    if (hasBadChars(transcription)) return false;
    if (nonLexicalTags.includes(Penn)) return false;
    return true;
  };

  const processFile = async filePath => {

    const textWordforms = new Map;
    let   textSize      = 0;

    const { utterances } = await readJSON(filePath);

    utterances.forEach(({ words }) => {

      corpusSize += words.length;
      textSize   += words.length;

      words
      .filter(isGoodToken)
      .forEach(word => {
        countToken(word, textWordforms);
        countToken(word, corpusWordforms);
      });

    });

    const filename = path.basename(filePath, `.json`);

    texts.set(filename, {
      rawSize:   textSize,
      wordforms: textWordforms,
    });

  };

  try {
    await processDir(dataDir, processFile, ignore);
  } catch (e) {
    spinner.fail(e.message);
    throw e;
  }

  console.info(`\nSize of Corpus: ${corpusSize.toLocaleString()} words\n`);

}
