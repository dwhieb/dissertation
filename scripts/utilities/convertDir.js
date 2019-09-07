import ProgressBar from 'progress';
import recurse     from 'recursive-readdir';

/**
 * Converts a directory of files by applying the provided conversion function to each file in the directory
 * @param  {String}   dir     The path to the directory to convert
 * @param  {Function} convert The conversion function to apply to each file in the directory
 * @param  {Function} ignore  A function that accepts two arguments (filePath and stats), and should return true if the file should be ignored. Used to ignore files in the specified directory of files to convert.
 * @return {Promise}
 */
export default async function convertDir(dir, convert, ignore) {

  try {

    const files       = await recurse(dir, [ignore]);
    const progressBar = new ProgressBar(`:bar`, { total: files.length });

    for (const filePath of files) {
      await convert(filePath); // eslint-disable-line no-await-in-loop
      progressBar.tick();
    }

  } catch (e) {

    console.error(e);

  }

}
