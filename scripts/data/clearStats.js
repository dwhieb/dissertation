/**
 * Removes all JSON files from the provided directory
 */

import fs             from 'fs';
import path           from 'path';
import { processDir } from '../utilities/index.js';

const { unlink } = fs.promises;

const [,, dir] = process.argv;

function clearStats(filePath) {
  return unlink(filePath);
}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

processDir(dir, clearStats, ignore);
