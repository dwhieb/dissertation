export default function getGlosses(word) {
  if (!word.morphemes?.length) return [];
  return word.morphemes.map(({ gloss }) => gloss.eng);
}
