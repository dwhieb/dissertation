import clearDataFiles   from './clearDataFiles.js';
import convertCoNLL    from './convertCoNLL.js';
import removeBadTokens from './removeBadTokens.js';

export default async function prepareData(dataDir) {

  console.info(`removing auxiliary files`);
  await clearDataFiles(dataDir);

  console.info(`converting CoNLL files to JSON`);
  await convertCoNLL(dataDir);

  console.info(`removing unwanted data`);
  await removeBadTokens(dataDir);

}
