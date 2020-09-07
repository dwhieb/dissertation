/* eslint-disable
  no-await-in-loop,
*/

import getTextStats from './getTextStats.js';
import path         from 'path';
import ProgressBar  from 'progress';
import recurse      from 'recursive-readdir';

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

export default async function getTextsFrequencies(dataDir, wordFilter, unit) {

  const textsInfo   = new Map;
  const files       = await recurse(dataDir, [ignore]);
  const progressBar = new ProgressBar(`:bar :current :total :percent :eta`, { total: files.length });

  for (const filePath of files) {

    const filename = path.basename(filePath, `.json`);
    const textInfo = await getTextStats(filePath, wordFilter, unit);

    textsInfo.set(filename, textInfo);
    progressBar.tick();

  }

  return textsInfo;

}
