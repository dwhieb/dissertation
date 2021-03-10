/* eslint-disable
  max-statements,
  no-await-in-loop,
*/

import createStringifier  from 'csv-stringify';
import englishFilter      from '../../data/English/scripts/tokenFilter.js';
import { fileURLToPath }  from 'url';
import getRelativeEntropy from './getStatistics/getRelativeEntropy.js';
import path               from 'path';
import ProgressBar        from 'progress';
import recurse            from 'recursive-readdir';

import {
  createWriteStream,
  promises,
  readFileSync,
}  from 'fs';

const { readFile } = promises;

// PATHS

const currentDir       = path.dirname(fileURLToPath(import.meta.url));
const dataDir          = path.join(currentDir, `../../data`);
const englishStemsPath = path.join(dataDir, `English/selected_archlexemes.txt`);

// English Stem List

const englishStemList = readFileSync(englishStemsPath, `utf8`);

const englishStems = englishStemList
  .split(/[\r\n]+/gu)
  .map(stem => stem.trim())
  .filter(Boolean);

const defaultStats = {
  frequency: 0,
  MOD:       0,
  PRED:      0,
  REF:       0,
};

// CONSTANTS

const functions = [
  `REF`,
  `PRED`,
  `MOD`,
];

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

const minFrequency = 4;

// METHODS

function calculateFlexibilityRating(REF, PRED, MOD) {

  let flexibility = getRelativeEntropy([REF, PRED, MOD]);

  if (
    Object.is(flexibility, -0)
    || Number.isNaN(flexibility)
  ) {
    flexibility = 0;
  }

  return flexibility;

}

function calculateMeanFlexibility(frequencies) {

  const flexibilityRatings = Array.from(frequencies.values())
  .map(({ flexibility }) => flexibility)
  .filter(Boolean);

  return flexibilityRatings
  .reduce((acc, val) => acc + val, 0) / flexibilityRatings.length;

}

function createTSVStream(outputPath) {

  const ws  = createWriteStream(outputPath);
  const tsv = createStringifier({ delimiter: `\t` });

  ws.on(`error`, e => { throw e; });
  tsv.on(`error`, e => { throw e; });

  tsv.pipe(ws);

  return tsv;

}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
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

class TextProcessor {

  constructor({
    frequencies,
    languageTSV,
    sampleNum,
    wordFilter,
    wordsTSV,
  }) {
    this.frequencies = frequencies;
    this.languageTSV = languageTSV;
    this.sampleNum   = sampleNum;
    this.wordFilter  = wordFilter;
    this.wordsTSV    = wordsTSV;
  }

  async processText(filePath) {
    const text = await TextProcessor.readText(filePath);
    text.utterances.forEach(u => this.processUtterance(u));
  }

  processUtterance({ words }) {

    if (!words?.length) return;

    words = words // eslint-disable-line no-param-reassign
    .filter(this.wordFilter)
    .filter(w => w.stem !== `NA`)
    .filter(w => w.stem);

    words.forEach(w => this.processWord(w));

  }

  processWord(w) {

    if (!functions.includes(w.tags.function)) return;

    const key = w.stem.toLowerCase();

    if (!this.frequencies.has(key)) this.frequencies.set(key, Object.assign({}, defaultStats));

    const stats = this.frequencies.get(key);

    stats[w.tags.function] += 1;
    stats.frequency        += 1;

    if (stats.frequency < minFrequency) return;

    const { frequency, REF, PRED, MOD } = stats;

    stats.flexibility = calculateFlexibilityRating(REF, PRED, MOD);

    this.wordsTSV.write([
      this.sampleNum,
      key,
      REF,
      PRED,
      MOD,
      frequency,
      stats.flexibility,
    ]);

    const meanFlexibility = calculateMeanFlexibility(this.frequencies);

    if (!Number.isNaN(meanFlexibility)) {
      this.languageTSV.write([this.sampleNum, meanFlexibility]);
    }

  }

  static async readText(filePath) {
    const json = await readFile(filePath, `utf8`);
    return JSON.parse(json);
  }

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

  for (let i = 0; i < samples.length; i++) {

    const sampleNum = i + 1;

    console.info(`Running sample ${sampleNum} of ${numSamples}.`);

    const frequencies = new Map;
    const sample      = samples[i];
    const progressBar = new ProgressBar(`:bar :current :total :percent :eta`, { total: sample.length });

    const textProcessor = new TextProcessor({
      frequencies,
      languageTSV,
      sampleNum,
      wordFilter,
      wordsTSV,
    });

    for (const filename of sample) {
      await textProcessor.processText(filename);
      progressBar.tick();
    }

  }

  languageTSV.end();
  wordsTSV.end();

  await Promise.all([endLanguageStream, endWordsStream]);

}
