/**
 * This script adds word transcriptions
 */

/* eslint-disable
  max-nested-callbacks,
*/

import { fileURLToPath } from 'url';
import findAndReplace    from '../../../scripts/utilities/findAndReplace.js';
import path              from 'path';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

function tokenize(transcript) {
  return transcript
  .trim()
  .replace(/[.,!?'"‘’“”():-]+/gu, ``)
  .split(/\s+/gu);
}

void async function addWordTranscriptions() {

  const dataDir = path.join(currentDir, `../texts`);

  const options = {
    searchOnly: false,
    testRun:    false,
  };

  await findAndReplace(dataDir, utterance => {

    if (!(utterance.words && utterance.transcript)) return;

    const tokens = tokenize(utterance.transcript);

    if (tokens.length === utterance.words.length) {

      tokens.forEach((token, i) => {
        // eslint-disable-next-line no-param-reassign
        utterance.words[i].transcription = token;
      });

    }

    return utterance;

  }, options);

}();
