import clearAuxFiles   from '../data/clearAuxFiles.js';
import convertCoNLL    from '../data/convertCoNLL.js';
import removeBadTokens from '../data/removeBadTokens.js';

void async function stats() {
  await clearAuxFiles();
  await convertCoNLL();
  await removeBadTokens();
}();
