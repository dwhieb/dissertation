export default function getSmallestTextSize(textsFrequencies) {
  return Array.from(textsFrequencies.values())
  .reduce((smallest, { relativeSize }) => (relativeSize < smallest ? relativeSize : smallest), 1);
}
