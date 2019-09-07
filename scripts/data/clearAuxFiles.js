/**
 * Removes all JSON files from the provided directory
 */

import { fileURLToPath } from 'url';
import fs                from 'fs';
import module            from 'module'; // eslint-disable-line no-shadow
import path              from 'path';
import { processDir }    from '../utilities/index.js';

const require = module.createRequire(fileURLToPath(import.meta.url)); // eslint-disable-line no-shadow

const { unlink } = fs.promises;

function clearAuxFiles(filePath) {
  return unlink(filePath);
}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

if (require.main === module) {
  const [,, dir] = process.argv;
  processDir(dir, clearAuxFiles, ignore);
}

export default dir => processDir(dir, clearAuxFiles, ignore);
