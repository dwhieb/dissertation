/**
 * Removes all JSON files from the provided directory
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import fs                from 'fs';
import path              from 'path';
import { processDir }    from '../utilities/index.js';

const require = createRequire(fileURLToPath(import.meta.url)); // eslint-disable-line no-shadow

const { unlink } = fs.promises;

const [,, dir] = process.argv;

function clearAuxFiles(filePath) {
  return unlink(filePath);
}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

if (require.main === module) processDir(dir, clearAuxFiles, ignore);

export default () => processDir(dir, clearAuxFiles, ignore);
