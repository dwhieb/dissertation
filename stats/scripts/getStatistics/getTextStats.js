import fs from 'fs-extra';

const { readJSON } = fs;

const tags = [
  `GER`,
  `INF`,
  `MOD`,
  `PRED`,
  `PREDCXN`,
  `REF`,
];

export default async function getTextStats(filePath, wordFilter, unit) {

  const { utterances }    = await readJSON(filePath);
  const lexemeFrequencies = new Map;
  let   textSize          = 0;

  utterances.forEach(({ words }) => {

    if (!words?.length) return;

    textSize += words.length;

    words
    .filter(wordFilter)
    .forEach(word => {

      if (word.stem === `NA`) return;

      let key;

      switch (unit) {
        case `wordform`: key = word.transcription.default; break;
        case `stem`: key = word.stem; break;
        case `root`: key = word.root; break;
        default:
      }

      if (!key) return;

      key = key.toLowerCase();

      const itemStats = lexemeFrequencies.get(key) ?? {
        aspect:    word.tags.aspect ?? `NULL`,
        frequency: 0,
        GER:       0,
        INF:       0,
        MOD:       0,
        PRED:      0,
        PREDbroad: 0,
        PREDCXN:   0,
        REF:       0,
        REFbroad:  0,
      };

      lexemeFrequencies.set(key, itemStats);
      itemStats.frequency++; // count frequency of all words, even untagged ones

      itemStats.gloss = word.stemGloss;
      if (!tags.includes(word.tags.function)) return;

      itemStats[word.tags.function]++;
      if (word.tags.function === `GER`) return itemStats.REFbroad++;
      if (word.tags.function === `INF`) return itemStats.REFbroad++;
      if (word.tags.function === `PREDCXN`) itemStats.PREDbroad++;

    });

  });

  return {
    lexemeFrequencies,
    size: textSize,
  };

}
