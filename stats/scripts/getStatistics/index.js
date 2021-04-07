import createStatsFile              from './createStatsFile.js';
import getAverageFlexibility        from './getAverageFlexibility.js';
import getCorpusFunctionFrequencies from './getCorpusFunctionFrequencies.js';
import getCorpusSize                from './getCorpusSize.js';
import getLexemeFrequencies         from './getLexemeFrequencies.js';
import getLexemeStats               from './getLexemeStats.js';
import getTextsStats                from './getTextsStats.js';

export default async function getStatistics(dataDir, { outputPath, unit = `stem`, wordFilter } = {}) {

  console.info(`Calculating text frequencies`);

  const textsStats = await getTextsStats(dataDir, wordFilter, unit);
  const corpusSize = getCorpusSize(textsStats);

  textsStats.forEach(textStats => {
    textStats.relativeSize = textStats.size / corpusSize;
  });

  const corpusFrequencies         = getLexemeFrequencies(textsStats);
  const corpusFunctionFrequencies = getCorpusFunctionFrequencies(textsStats);

  const lexemeStats = getLexemeStats(
    corpusFrequencies,
    textsStats,
    corpusSize,
    corpusFunctionFrequencies,
  );

  const {
    meanFlexibility,
    meanNormalizedFlexibility,
    medianFlexibility,
    medianNormalizedFlexibility,
  } = getAverageFlexibility(lexemeStats);

  await createStatsFile(outputPath, lexemeStats);

  console.info(`Corpus size: ${ corpusSize.toLocaleString() }`);
  console.info(`Mean flexibility: ${ meanFlexibility }`);
  console.info(`Mean normalized flexibility: ${ meanNormalizedFlexibility }`);
  console.info(`Median flexibility: ${ medianFlexibility }`);
  console.info(`Median normalized flexibility: ${ medianNormalizedFlexibility }`);

}
