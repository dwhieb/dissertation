/**
 * This scripts deletes any files from the OANC that are not .txt, -hepple.xml, .conll, or .json files
 */

import fs             from 'fs';
import { processDir } from '../utilities/index.js';

const { unlink: removeFile } = fs.promises;

export default function removeFiles(dir, ending) {

  function ignore(filePath, stats) {
    if (stats.isDirectory()) return false;
    return !filePath.endsWith(ending);
  }

  return processDir(dir, removeFile, ignore);

}
