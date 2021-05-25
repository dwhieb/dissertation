import { fileURLToPath } from 'url';
import fs                from 'fs';
import path              from 'path';
import recurse           from 'recursive-readdir';
import yaml              from 'yaml';

const { readFile } = fs.promises;

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const allowList = [
  'abstract.tex',
  'conventions.tex',
  '1-introduction.tex',
  '2-background.tex',
  '3-methods.tex',
  '4-results.tex',
  '5-conclusion.tex',
];

async function getListGlosses() {
  const yamlList  = await readFile(path.join(currentDir, '../../src/abbreviations.yml'), 'utf8');
  const glossData = yaml.parse(yamlList);
  return new Set(Object.keys(glossData));
}

async function getThesisGlosses() {

  const filePaths    = await recurse(path.join(currentDir, '../../src'), [ignoreFilter]);
  const fileContents = await Promise.all(filePaths.map(filePath => readFile(filePath, 'utf8')));

  return fileContents.reduce((set, text) => {

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

function ignoreFilter(filePath, stats) {
  if (stats.isDirectory()) return false;
  return !allowList.includes(path.basename(filePath));
}

/**
 * Get the symmetric difference between two sets
 */
function symmetricDifference(a, b) {
  return Array.from(a).filter(item => !b.has(item));
}

void async function generateAbbreviations() {

  const listGlosses    = await getListGlosses();
  const thesisGlosses  = await getThesisGlosses();
  const missingGlosses = symmetricDifference(thesisGlosses, listGlosses).sort();

  if (missingGlosses.length) {
    console.error('\nWARNING: Some glosses are missing from the abbreviations list.\n');
    console.table(missingGlosses);
    throw new Error('MissingGlossesError');
  } else {
    console.info('\nNo missing abbreviations.\n');
  }

}();
