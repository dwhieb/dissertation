import generateWordforms from './generateWordforms.js';
import path              from 'path';

export default function runStats(dataDir, outputDir) {

  const wordformsPath = path.join(outputDir, `wordforms.tsv`);

  console.info(`Generating list of wordforms`);
  return generateWordforms(dataDir, wordformsPath);

}
