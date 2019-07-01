/**
 * Generates the List of Abbreviations in the frontmatter
 */

import { compare }   from '../utilities/index.mjs';
import createSpinner from 'ora';
import fs            from 'fs';
import path          from 'path';
import rootDir       from '../constants/rootDir.mjs';
import yamlParser    from 'yaml';

const abbreviationsChapterPath = path.join(rootDir, `src/frontmatter/abbreviations.tex`);
const abbreviationsListPath    = path.join(rootDir, `src/abbreviations.yml`);
// padding to use at the beginning of each line of the List of Abbreviations table
const padding                  = 6;
const tableRegExp              = /(?<beg>% BEGIN ABBREVIATIONS)(?<tableLines>.+?)(?<end>\s+% END ABBREVIATIONS)/su;

const { readFile, writeFile } = fs.promises;

async function generateAbbreviations() {

  const spinner = createSpinner(`Generating List of Abbreviations`).start();

  try {

    // Read list of known abbreviations from YAML file
    const yaml = await readFile(abbreviationsListPath, `utf8`);
    const json = yamlParser.parse(yaml);

    const tableLines = Object.entries(json)
    .sort(([a], [b]) => compare(a, b))
    .map(([abbr, meaning]) => {
      const str = `\\gl{${abbr}} & ${meaning}\\\\`;
      return str.padStart(str.length + padding);
    })
    .join(`\r\n`);

    const oldTeX = await readFile(abbreviationsChapterPath, `utf8`);
    const newTeX = oldTeX.replace(tableRegExp, `$1\r\n${tableLines}$3`);

    await writeFile(abbreviationsChapterPath, newTeX, `utf8`);

  } catch (e) {

    return spinner.fail(e.message);

  }

  spinner.succeed(`Generated List of Abbreviations`);

}

generateAbbreviations();
