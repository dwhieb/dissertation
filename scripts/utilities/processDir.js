import ProgressBar from 'progress';
import recurse     from 'recursive-readdir';

/**
 * Processes a directory of files by applying the provided function to each file in the directory
 * @param  {String}   dir     The path to the directory to process
 * @param  {Function} task    The function to apply to each file in the directory. Recevies the path to the file as the argument.
 * @param  {Function} ignore  A function that accepts two arguments (filePath and stats), and should return true if the file should be ignored. Used to ignore files in the specified directory of files to convert.
 * @return {Promise}
 */
export default async function processDir(dir, task, ignore = () => false) {

  const files       = await recurse(dir, [ignore]);
  const progressBar = new ProgressBar(`:bar :current :total :percent :eta`, { total: files.length });
  const results     = [];

  for (const filePath of files) {
    const result = await task(filePath); // eslint-disable-line no-await-in-loop
    results.push(result);
    progressBar.tick();
  }

  return results;

}
