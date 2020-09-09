import sum from '../../../scripts/utilities/sum.js';

export default function getCorpusSize(textsInfo) {
  return sum(Array.from(textsInfo.values()));
}
