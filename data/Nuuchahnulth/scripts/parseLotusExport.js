/* eslint-disable
  max-nested-callbacks,
*/

import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import mergeTexts        from './mergeTexts.js';
import path              from 'path';
import processDir        from '../../../scripts/utilities/processDir.js';
import { Text }          from '@digitallinguistics/javascript/models';

const currentDir   = path.dirname(fileURLToPath(import.meta.url));
const { readJSON } = fs;

const [,, exportFilePath] = process.argv;
const textsDir            = path.join(currentDir, `../texts`);

/**
 * Parses an export file from the Lotus app, merging it with the existing Nuuchahnulth texts.
 * @param  {String} filePath The path to the Lotus export file
 */
void async function parseLotusExport() {

  if (!exportFilePath) {
    throw new Error(`Please provide the path to the Lotus export file.`);
  }

  const exportData = await readJSON(exportFilePath, `utf8`);

  const lotusTexts = exportData
  .filter(item => item.type === `Text`)
  .map(text => new Text(text));

  await processDir(textsDir, async filePath => {

    const dissertationTextData = await readJSON(filePath, `utf8`);
    const dissertationText     = new Text(dissertationTextData);
    const lotusText            = lotusTexts.find(text => text.cid === dissertationText.cid);
    const updatedText          = mergeTexts(dissertationText, lotusText);
    console.log(updatedText);

  });

  // merge each text into existing (need to modularize a mergeTexts script)
  // report new coverage statistics

}();
