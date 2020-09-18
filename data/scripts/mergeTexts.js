/* eslint-disable
  max-nested-callbacks,
  no-param-reassign,
*/

export default function mergeTexts(oldText, newText) {

  oldText.utterances = newText.utterances.map((newUtterance, u) => {

    const oldUtterance = oldText.utterances[u];
    if (!oldUtterance.words) return newUtterance;

    oldUtterance.words.forEach((oldWord, w) => {
      const newWord = newUtterance.words[w];
      oldWord.stem = newWord.stem;
      newWord.tags.forEach((value, category) => oldWord.tags.set(category, value));
    });

    return oldUtterance;

  });

  return oldText;

}
