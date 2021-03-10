import createStringifier from 'csv-stringify';
import englishFilter     from '../../data/English/scripts/tokenFilter.js';
import { fileURLToPath } from 'url';
import path              from 'path';
import recurse           from 'recursive-readdir';

import { createWriteStream, readFileSync }  from 'fs';

// Paths

const currentDir       = path.dirname(fileURLToPath(import.meta.url));
const dataDir          = path.join(currentDir, `../../data`);
const englishStemsPath = path.join(dataDir, `English/selected_archlexemes.txt`);

// get list of English stems

const englishStemList = readFileSync(englishStemsPath, `utf8`);

const englishStems = englishStemList
  .split(/[\r\n]+/gu)
  .map(stem => stem.trim())
  .filter(Boolean);

const languageSettings = {
  English:      {
    textsDir: path.join(dataDir, `English/texts`),
    wordFilter(w) {
      return englishFilter(w) && englishStems.includes(w.stem);
    },
  },
  Nuuchahnulth: {
    textsDir: path.join(dataDir, `Nuuchahnulth/texts`),
    wordFilter() { return true; },
  },
};

function createTSVStream(outputPath) {

  const ws  = createWriteStream(outputPath);
  const tsv = createStringifier({ delimiter: `\t` });

  ws.on(`error`, e => { throw e; });
  tsv.on(`error`, e => { throw e; });

  tsv.pipe(ws);

  return tsv;

}

/**
 * Randomizes the order of the values of an array, returning a new array.
 * https://www.30secondsofcode.org/js/s/shuffle
 * @param  {Array} arr The array to randomize
 * @return {Array}     Returns a new, randomized array
 */
function shuffle([...arr]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]]; // eslint-disable-line no-param-reassign
  }
  return arr;
}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

export default async function getCumulativeFlexibility(
  language,
  outputPath = `.`,
  numSamples = 1,
) {

  const { wordFilter, textsDir } = languageSettings[language];
  const files                    = await recurse(textsDir, [ignore]);
  const samples                  = [];

  for (let i = 0; i < numSamples; i++) {
    samples.push(shuffle(files));
  }

  const languageTSV = createTSVStream(path.join(outputPath, `${language}.tsv`));
  const wordsTSV    = createTSVStream(path.join(outputPath, `${language}_items.tsv`));

  const endLanguageStream = new Promise(resolve => {
    languageTSV.on(`end`, resolve);
  });

  const endWordsStream = new Promise(resolve => {
    wordsTSV.on(`end`, resolve);
  });

  languageTSV.end();
  wordsTSV.end();

  await Promise.all([endLanguageStream, endWordsStream]);

}
