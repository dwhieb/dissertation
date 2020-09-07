export default function getCorpusSize(textsInfo) {
  return Array.from(textsInfo.values())
  .reduce((acc, { size }) => acc + size, 0);
}
