/* eslint-disable
  no-param-reassign,
*/

export default function calculateDispersion(lexeme, corpusStats, textsFrequencies) {

  const differences = Array.from(textsFrequencies.entries())
  .reduce((diffs, [filename, textStats]) => {

    const textLexemeFrequencies         = textStats.lexemeFrequencies;
    const expectedRelativeTextFrequency = textStats.relativeSize;
    const actualRelativeTextFrequency   = (textLexemeFrequencies.get(lexeme)?.frequency ?? 0) / corpusStats.frequency;
    const difference                    = Math.abs(expectedRelativeTextFrequency - actualRelativeTextFrequency);

    return diffs.set(filename, difference);

  }, new Map);

  // get sum of the absolute differences calculated above
  const sumDifferences = Array.from(differences.values())
  .reduce((sum, count) => sum + count, 0);

  corpusStats.dispersion = sumDifferences / 2;

}
