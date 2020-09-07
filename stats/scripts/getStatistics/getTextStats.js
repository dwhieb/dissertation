import fs from 'fs-extra';

const { readJSON } = fs;

const tags = [
  `REF`,
  `PRED`,
  `MOD`,
];

export default async function getTextStats(filePath, wordFilter, unit) {

  const { utterances }    = await readJSON(filePath);
  const lexemeFrequencies = new Map;
  let   textSize              = 0;

  utterances.forEach(({ words }) => {

    if (!words?.length) return;

    textSize += words.length;

    words
    .filter(wordFilter)
    .forEach(word => {

      let prop;

      switch (unit) {
        case `wordform`: prop = `transcription`; break;
        case `lexeme`: prop = `stem`; break;
        case `root`: prop = `root`; break;
        default:
      }

      const key = word[prop]?.toLowerCase();

      if (!key) return;

      const itemStats = lexemeFrequencies.get(key) ?? {
        frequency: 0,
        MOD:       0,
        PRED:      0,
        REF:       0,
      };

      itemStats.frequency++; // count frequency of all words, even untagged ones

      if (!tags.includes(word.tags.function)) return;

      itemStats[word.tags.function]++;
      lexemeFrequencies.set(key, itemStats);

    });

  });

  lexemeFrequencies.forEach(itemStats => {
    // eslint-disable-next-line no-param-reassign
    itemStats.relativeFrequency = itemStats.frequency / textSize;
  });

  return {
    lexemeFrequencies,
    size: textSize,
  };

}
