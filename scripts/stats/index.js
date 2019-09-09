import generateLexemes   from './generateLexemes.js';
import generateWordforms from './generateWordforms.js';
import path              from 'path';

export default async function runStats(dataDir, outputDir) {

  const lexemesPath   = path.join(outputDir, `lexemes.tsv`);
  const wordformsPath = path.join(outputDir, `wordforms.tsv`);

  console.info(`Generating list of wordforms`);
  await generateWordforms(dataDir, wordformsPath);

  console.info(`Generating list of lexemes`);
  return generateLexemes(dataDir, lexemesPath);

}
