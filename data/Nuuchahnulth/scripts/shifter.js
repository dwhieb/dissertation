import findAndReplace from '../../../scripts/utilities/findAndReplace.js';

function search(u) {

  if (!u.words?.length) return u;

  u.words.forEach(w => {

    if (!w.morphemes?.length) return;

    w.morphemes.forEach(m => {

      if (m.transcription.default === `ʼat` && m.gloss === `POSS`) {

        m.gloss = `SHIFT`; // eslint-disable-line no-param-reassign

      }

    });

  });

  return u;

}

const dataDir = 'data/Nuuchahnulth/texts';

findAndReplace(dataDir, search, { searchOnly: false, testRun: false })
.catch(console.error);
