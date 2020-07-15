import createSpinner from 'ora';
import fs            from 'fs-extra';
import path          from 'path';
import processDir    from './processDir.js';

const {
  readJSON,
  writeJSON,
} = fs;

/**
 * Searches the entire Nuuchahnulth corpus using the provided search function,
 * and saves any changes that are made to the corpus, overwriting old files
 * @param {Function} searchFunction            A function that accepts an utterance as an argument, and returns an updated utterance. Return the original utterance if no changes need to be made.
 * @param {Object}   [options={}]              An options hash
 * @param {Boolean}  [options.testRun=true]    Whether to resave the files over the originals (testRun = false), or as a new file (testRun = true). Defaults to true.
 * @param {Boolean}  [options.searchOnly=true] Whether function is being called for search, or for find and replace. If true, does not update/resave files. If false, files are saved/overwritten.
 */
export default async function findAndReplace(searchFunction = u => u, { searchOnly = true, testRun = true } = {}) {

  const spinner  = createSpinner(`Running ${searchOnly ? `search` : `find and replace`}${testRun ? ` as a test run` : ``}.`).start();
  const jsonPath = path.join(`data`, `Nuuchahnulth`, `texts`);

  /**
   * Ignore method which tells processDir to ignore the -updated.json files
   * and any non-JSON files
   */
  const ignore = (filePath, stats) => {
    if (stats.isDirectory()) return false;
    if (filePath.endsWith(`-updated.json`)) return true;
    return path.extname(filePath) !== `.json`;
  };

  const processFile = async filePath => {

    const text = await readJSON(filePath);

    text.utterances = text.utterances.map(utterance => searchFunction(utterance) ?? utterance);

    if (searchOnly) return;

    const writePath = testRun ? filePath.replace(`.json`, `-updated.json`) : filePath;
    await writeJSON(writePath, text, { spaces: 2 });

  };

  try {
    await processDir(jsonPath, processFile, ignore);
  } catch (e) {
    spinner.fail(e.message);
  }

  spinner.succeed(`${searchOnly ? `Search` : `Find and replace`} complete.`);

}
