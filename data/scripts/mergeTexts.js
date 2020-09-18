/* eslint-disable
  max-nested-callbacks,
  no-param-reassign,
*/

export default function mergeTexts(oldText, newText) {

  oldText.utterances = newText.utterances.map((newUtterance, u) => {

    const oldUtterance = oldText.utterances[u];

    if (!oldUtterance.words) return newUtterance;

    newUtterance.words.forEach((newWord, w) => {

      const oldWord = oldUtterance.words[w];

      oldWord.stem = newWord.stem;

      Object.entries(newWord.tags).forEach(([category, value]) => {
        oldWord.tags[category] = value;
      });

    });

    return oldUtterance;

  });

  return oldText;

}
