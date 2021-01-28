import createStringifier  from 'csv-stringify';
import EnglishFilter      from '../../data/English/scripts/tokenFilter.js';
import { fileURLToPath }  from 'url';
import fs                 from 'fs-extra';
import getRelativeEntropy from './getStatistics/getRelativeEntropy.js';
import path               from 'path';
import processDir         from '../../scripts/utilities/processDir.js';

const { readFileSync, readJSON } = fs;

const currentDir       = path.dirname(fileURLToPath(import.meta.url));
const dataDir          = path.join(currentDir, `../../data`);
const EnglishStemsPath = path.join(dataDir, `English/selected_archlexemes.txt`);

const EnglishStemList = readFileSync(EnglishStemsPath, `utf8`);

const EnglishStems = EnglishStemList
  .split(/[\r\n]+/gu)
  .map(stem => stem.trim())
  .filter(Boolean);

const defaultStats = {
  frequency: 0,
  MOD:       0,
  PRED:      0,
  REF:       0,
};

const functions = [
  `REF`,
  `PRED`,
  `MOD`,
];

const languageSettings = {
  English:      {
    textsDir: path.join(dataDir, `English/texts`),
    wordFilter(w) {
      return EnglishFilter(w) && EnglishStems.includes(w.stem);
    },
  },
  Nuuchahnulth: {
    textsDir: path.join(dataDir, `Nuuchahnulth/texts`),
    wordFilter() { return true; },
  },
};

const minFrequency = 4;

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

function createStreams(outputPath) {

  const ws  = fs.createWriteStream(outputPath);
  const tsv = createStringifier({ delimiter: `\t` });

  ws.on(`error`, e => { throw e; });
  tsv.on(`error`, e => { throw e; });

  tsv.pipe(ws);

  return tsv;

}

function createTextProcessor(
  frequencies,
  wordsTSV,
  meanTSV,
  wordFilter,
) {
  return async function processText(filePath) {

    const text = await readJSON(filePath);

    text.utterances.forEach(({ words }) => {

      if (!words?.length) return;

      words = words // eslint-disable-line no-param-reassign
      .filter(wordFilter)
      .filter(w => w.stem !== `NA`)
      .filter(w => w.stem);

      words.forEach(w => {

        if (!functions.includes(w.tags.function)) return;

        const key = w.stem.toLowerCase();

        if (!frequencies.has(key)) frequencies.set(key, Object.assign({}, defaultStats));

        const stats = frequencies.get(key);

        stats[w.tags.function] += 1;
        stats.frequency += 1;

        if (stats.frequency < minFrequency) return;

        const { frequency, REF, PRED, MOD } = stats;

        stats.flexibility = calculateFlexibilityRating(REF, PRED, MOD);

        wordsTSV.write([
          key,
          REF,
          PRED,
          MOD,
          frequency,
          stats.flexibility,
        ]);

        const meanFlexibility = calculateMeanFlexibility(frequencies);

        if (!Number.isNaN(meanFlexibility)) {
          meanTSV.write([meanFlexibility]);
        }

      });

    });

  };
}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

export default async function getCumulativeFlexibility(language, outputPath = `./out.tsv`) {

  const { wordFilter, textsDir } = languageSettings[language];

  const frequencies = new Map;
  const wordsTSV    = createStreams(outputPath);
  const meanTSV     = createStreams(`stats/data/${language}_means.tsv`);

  const processText = createTextProcessor(
    frequencies,
    wordsTSV,
    meanTSV,
    wordFilter,
  );

  const endStream = new Promise(resolve => {
    wordsTSV.on(`end`, resolve);
  });

  await processDir(textsDir, processText, ignore);

  wordsTSV.end();

  await endStream;

}
