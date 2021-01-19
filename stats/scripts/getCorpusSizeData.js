import EnglishFilter     from '../../data/English/scripts/tokenFilter.js';
import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import path              from 'path';
import processDir        from '../../scripts/utilities/processDir.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir    = path.join(currentDir, `../../data`);

const { readJSON } = fs;

const defaultStats = {
  MOD:  0,
  PRED: 0,
  REF:  0,
};

const languageSettings = {
  English:      {
    sampleIncrement: 10000,
    textsDir:        path.join(dataDir, `English/texts`),
    tokenLimit:      1500000,
    wordFilter:      EnglishFilter,
  },
  Nuuchahnulth: {
    sampleIncrement: 1000,
    textsDir:        path.join(dataDir, `Nuuchahnulth/texts`),
    tokenLimit:      8000,
    wordFilter() { return true; },
  },
};

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

export default async function getCorpusSizeData(language, outputPath = `./out.tsv`) {

  const {
    sampleIncrement,
    textsDir,
    tokenLimit,
    wordFilter,
  } = languageSettings[language];

  const stats  = new Map;
  let   tokens = 0;

  async function countText(filePath) {

    if (tokens >= tokenLimit) return;

    const text = await readJSON(filePath);

    text.utterances.forEach(({ words }) => {

      if (tokens >= tokenLimit) return;
      if (!words?.length) return;

      words = words // eslint-disable-line no-param-reassign
      .filter(wordFilter)
      .filter(w => w.stem !== `NA`)
      .filter(w => w.stem);

      words.forEach(w => {

        if (tokens >= tokenLimit) return;

        const key = w.stem.toLowerCase();

        if (!stats.has(key)) stats.set(key, {});

        const wordStats       = stats.get(key);
        const sampleNum       = Math.ceil(tokens / sampleIncrement);
        const prevSampleStats = wordStats[sampleNum - 1];

        wordStats[sampleNum] ??= Object.assign({}, prevSampleStats ?? defaultStats);

        const sampleStats = wordStats[sampleNum];
        sampleStats[w.tags.function] += 1;

        tokens++;

      });

    });

  }

  console.info(`Compiling data on flexibility vs. corpus size.`);

  await processDir(textsDir, countText, ignore);

  console.info(`Corpus size data compiled to ${outputPath}`);

}
