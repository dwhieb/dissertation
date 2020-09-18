/* eslint-disable
  max-nested-callbacks,
*/

import fs                from 'fs-extra';
import mergeTexts        from './mergeTexts.js';
import processDir        from '../../../scripts/utilities/processDir.js';
import { Text }          from '@digitallinguistics/javascript/models';

const { readJSON, writeJSON } = fs;

const [,, exportFilePath, textsDir] = process.argv;

/**
 * Parses an export file from the Lotus app, merging it with the existing Nuuchahnulth texts.
 * @param  {String} filePath The path to the Lotus export file
 */
void async function parseLotusExport() {

  if (!exportFilePath) {
    throw new Error(`Please provide the path to the Lotus export file as the first argument.`);
  }

  if (!textsDir) {
    throw new Error(`Please provide the path to the directory of texts to update as the second argument.`);
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
    await writeJSON(filePath, updatedText, { encoding: `utf8`, spaces: 2 });
  });

}();
