export default function getGlosses(word) {
  return word.morphemes.map(({ gloss }) => gloss.eng);
}
