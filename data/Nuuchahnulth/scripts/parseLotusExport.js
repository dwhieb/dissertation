// merge each text into existing (need to modularize a mergeTexts script)
// report new coverage statistics

import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import path              from 'path';
import processDir        from '../../../scripts/utilities/processDir.js';
import { Text }          from '@digitallinguistics/javascript/models';

const currentDir   = path.dirname(fileURLToPath(import.meta.url));
const { readJSON } = fs;

const [,, filePath] = process.argv;
const textsDir      = path.join(currentDir, `../texts`);

/**
 * Parses an export file from the Lotus app, merging it with the existing Nuuchahnulth texts.
 * @param  {String} filePath The path to the Lotus export file
 */
void async function parseLotusExport() {

  if (!filePath) {
    throw new Error(`Please provide the path to the Lotus export file.`);
  }

  const exportData = await readJSON(filePath, `utf8`);

  const lotusTexts = exportData
  .filter(item => item.type === `Text`)
  .map(text => new Text(text));

  await processDir(textsDir, async filePath => {

    const dissertationText = await readJSON(filePath, `utf8`);
    const lotusText        = 

  });

}();
