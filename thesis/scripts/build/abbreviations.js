/**
 * Generates the List of Abbreviations in the frontmatter
 */

import compare           from '../../../scripts/utilities/compare.js';
import createSpinner     from 'ora';
import { fileURLToPath } from 'url';
import fs                from 'fs';
import path              from 'path';
import yamlParser        from 'yaml';

const { readFile, writeFile } = fs.promises;

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const abbreviationsChapterPath = path.join(currentDir, `../../src/frontmatter/abbreviations.tex`);
const abbreviationsListPath    = path.join(currentDir, `../../src/abbreviations.yml`);
const padding                  = 6; // padding to use at the beginning of each line of the List of Abbreviations table
const tableRegExp              = /(?<beg>% BEGIN ABBREVIATIONS %)(?<tableLines>.+?)(?<end>\s+% END ABBREVIATIONS %)/su;
const columnLength             = 28;

function chunk(arr, size) {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (item, i) => arr.slice(i * size, (i * size) + size),
  );
}

function createColumn(rows) {
  rows.unshift(`    \\begin{tabular}{ p{5em} l }`);
  rows.push(`    \\end{tabular}`);
  return rows.join(`\r\n`);
}

void async function generateAbbreviations() {

  const spinner = createSpinner(`Generating List of Abbreviations`).start();

  try {

    const yaml = await readFile(abbreviationsListPath, `utf8`);
    const json = yamlParser.parse(yaml);

    const tableLines = Object.entries(json)
    .sort(([a], [b]) => compare(a, b))
    .map(([abbr, meaning]) => {
      const str = `\\gl{${abbr}} & ${meaning}\\\\`;
      return str.padStart(str.length + padding);
    });

    const groups    = chunk(tableLines, columnLength);
    const tableText = groups.map(createColumn).join(`\r\n\r\n`);

    const oldTeX = await readFile(abbreviationsChapterPath, `utf8`);
    const newTeX = oldTeX.replace(tableRegExp, `$1\r\n${tableText}$3`);

    await writeFile(abbreviationsChapterPath, newTeX, `utf8`);

  } catch (e) {

    return spinner.fail(e.message);

  }

  spinner.succeed(`Generated List of Abbreviations`);

}();
