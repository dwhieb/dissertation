import { createRequire } from 'module';
import fs                from 'fs';
import path              from 'path';
import recurse           from 'recursive-readdir';
import rootDir           from '../constants/rootDir.js';

const { readFile } = fs.promises;
// const require      = createRequire(import.meta.url);
const srcDir       = path.join(rootDir, `src`);

const whiteList = [
  `abstract.tex`,
  `conventions.tex`,
  `1-introduction.tex`,
  `2-background.tex`,
  `3-methods.tex`,
  `4-results.tex`,
  `5-conclusion.tex`,
];

function ignoreFilter(filePath, stats) {
  if (stats.isDirectory()) return false;
  return !whiteList.includes(path.basename(filePath));
}

async function generateAbbreviations() {

  // Get list of relevant TeX files
  const filePaths = await recurse(srcDir, [ignoreFilter]);

  // Retrieve contents of relevant TeX files
  const fileContents = await Promise.all(filePaths.map(filePath => readFile(filePath, `utf8`)));

  // Generate a Set of unique glosses from the TeX files
  const glosses = fileContents.reduce((set, text) => {

    const matches = text.matchAll(/\\gl\{(?<gloss>.+?)\}/gu);

    for (const match of matches) {

      const { gloss } = match.groups;

      const abbreviations = gloss
      .split(/[.>/+]|[123]/gu)
      .filter(Boolean)
      .map(abbr => abbr.toLowerCase());

      abbreviations.forEach(abbr => set.add(abbr));

    }

    return set;

  }, new Set);

}

generateAbbreviations();
// if (require.main === undefined) generateAbbreviations();

export default generateAbbreviations;
