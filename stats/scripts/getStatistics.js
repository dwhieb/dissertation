import createStatsFile      from './createStatsFile.js';
import getCorpusSize        from './getCorpusSize.js';
import getLexemeFrequencies from './getLexemeFrequencies.js';
import getLexemeStats       from './getLexemeStats.js';
import getTextsStats        from './getTextsStats.js';

export default async function getStatistics(dataDir, { outputPath, unit = `lexeme`, wordFilter } = {}) {

  console.info(`Calculating text frequencies`);

  const textsStats = await getTextsStats(dataDir, wordFilter, unit);
  const corpusSize = getCorpusSize(textsStats);

  textsStats.forEach(info => {
    // eslint-disable-next-line no-param-reassign
    info.relativeSize = info.size / corpusSize;
  });

  const corpusFrequencies = getLexemeFrequencies(textsStats);
  const lexemeStats       = getLexemeStats(corpusFrequencies, textsStats);

  await createStatsFile(outputPath, lexemeStats);

  console.info(`Corpus size: ${corpusSize}`);

}
