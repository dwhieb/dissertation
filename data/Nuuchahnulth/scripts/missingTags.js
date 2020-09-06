import findAndReplace from '../../../scripts/utilities/findAndReplace.js';

const dataDir = `data/Nuuchahnulth/texts`;

const results = [];

function searchFunction(u, text) {

  if (!u.words?.length) return;

  u.words.forEach(w => {

    if (!w.tags) return;

    if (!Object.keys(w.tags).length) {
      results.push([text.title.en || text.title.eng, u.metadata]);
    }

  });

}

findAndReplace(dataDir, searchFunction, { searchOnly: true })
.then(() => console.info(results))
.catch(console.error);
