import csvStringify       from 'csv-stringify';
import EnglishFilter      from '../../data/English/scripts/tokenFilter.js';
import { fileURLToPath }  from 'url';
import fs                 from 'fs-extra';
import getRelativeEntropy from './getStatistics/getRelativeEntropy.js';
import path               from 'path';
import processDir         from '../../scripts/utilities/processDir.js';
import { promisify }      from 'util';

const currentDir       = path.dirname(fileURLToPath(import.meta.url));
const dataDir          = path.join(currentDir, `../../data`);
const EnglishStemsPath = path.join(dataDir, `English/selected_archlexemes.txt`);

const { readJSON, readFileSync, writeFile } = fs;
const json2csv = promisify(csvStringify);

const EnglishStemList = readFileSync(EnglishStemsPath, `utf8`);

const EnglishStems = EnglishStemList
  .split(/[\r\n]+/gu)
  .map(stem => stem.trim())
  .filter(Boolean);

const csvOptions = {
  delimiter: `\t`,
};

const defaultStats = {
  MOD:  0,
  PRED: 0,
  REF:  0,
};

const languageSettings = {
  English:      {
    sampleIncrement: 10000,
    textsDir:        path.join(dataDir, `English/texts`),
    wordFilter(w) {
      return EnglishFilter(w) && EnglishStems.includes(w.stem);
    },
  },
  Nuuchahnulth: {
    sampleIncrement: 1000,
    textsDir:        path.join(dataDir, `Nuuchahnulth/texts`),
    wordFilter() { return true; },
  },
};

const minFrequency = 4;

/**
 * Calculates the flexibility rating for a sample
 * @param  {Object} frequencies A hash of raw frequencies (REF, PRED, MOD) for the sample
 * @return {Number}             Returns a flexibility rating
 */
function calculateFlexibilityRating({ REF, PRED, MOD }) {

  let flexibility = getRelativeEntropy([REF, PRED, MOD]);

  if (
    Object.is(flexibility, -0)
    || Number.isNaN(flexibility)
  ) {
    flexibility = 0;
  }

  return flexibility;

}

/**
 * Convert raw frequencies to flexibility ratings
 * @param  {Map} frequencies Map of stems, each containing an Array of corpus samples
 * @return {Map}             Returns a Map of stems, each containing an Array of corpus samples
 */
function calculateFlexibilityRatings(frequencies) {

  const flexibilityRatings = new Map;

  frequencies.forEach((samples, stem) => {
    flexibilityRatings.set(stem, samples.map(calculateFlexibilityRating));
  });

  return flexibilityRatings;

}

function fillMissingRatings(ratings, numSamples) {

  ratings.forEach((samples, stem) => {

    const sampleRatings = [];

    for (let i = 0; i < numSamples; i++) {
      sampleRatings[i] = samples[i] ?? sampleRatings[i - 1] ?? 0;
    }

    ratings.set(stem, sampleRatings);

  });

}

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

function ratings2tabular(ratings) {
  return Array.from(ratings).map(([stem, samples]) => [stem, ...samples]);
}

export default async function getCorpusSizeData(language, outputPath = `./out.tsv`) {

  const {
    sampleIncrement,
    textsDir,
    wordFilter,
  } = languageSettings[language];

  let frequencies = new Map;
  let tokens      = 0;

  async function countText(filePath) {

    const text = await readJSON(filePath);

    text.utterances.forEach(({ words }) => {

      if (!words?.length) return;

      words = words
      .filter(wordFilter)
      .filter(w => w.stem !== `NA`)
      .filter(w => w.stem);

      words.forEach(w => {

        const key = w.stem.toLowerCase();

        if (!frequencies.has(key)) frequencies.set(key, []);

        const wordStats       = frequencies.get(key);
        const sampleNum       = Math.floor(tokens / sampleIncrement);
        const prevSampleStats = wordStats[sampleNum - 1];

        wordStats[sampleNum] ??= Object.assign({}, prevSampleStats ?? defaultStats);

        const sampleStats = wordStats[sampleNum];
        sampleStats[w.tags.function] += 1;

        wordStats.frequency ??= 0;
        wordStats.frequency++;

        tokens++;

      });

    });

  }

  console.info(`Compiling data on flexibility vs. corpus size.`);

  await processDir(textsDir, countText, ignore);

  frequencies = new Map(Array.from(frequencies.entries())
    .filter(([, samples]) => samples.frequency >= minFrequency));

  const flexibilityRatings = calculateFlexibilityRatings(frequencies);
  const numSamples         = Math.max(...Array.from(flexibilityRatings.values()).map(samples => samples.length));

  fillMissingRatings(flexibilityRatings, numSamples);

  const tableData = ratings2tabular(flexibilityRatings);
  const tsv       = await json2csv(tableData, csvOptions);

  await writeFile(outputPath, tsv, `utf8`);
  console.info(`Corpus size data compiled to ${outputPath}`);

}
