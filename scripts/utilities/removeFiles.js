/**
 * This scripts deletes any files in a directory that have the specified extension
 */

import fs         from 'fs';
import processDir from './processDir.js';

const { unlink: removeFile } = fs.promises;

export default function removeFiles(dir, ending) {

  function ignore(filePath, stats) {
    if (stats.isDirectory()) return false;
    return !filePath.endsWith(ending);
  }

  return processDir(dir, removeFile, ignore);

}
