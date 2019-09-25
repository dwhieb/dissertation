import path           from 'path';
import { processDir } from '../utilities/index.js';

function convertText(filePath) {

}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.txt`;
}

export default function convertOANC(dataDir) {
  return processDir(dataDir, convertText, ignore);
}
