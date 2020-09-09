/* eslint-disable
  no-param-reassign,
*/

export default function getRelativeFrequencies(corpusStats, corpusSize) {

  const relativize = frequency => (frequency * 1000) / corpusSize;

  corpusStats.relativeFrequency = relativize(corpusStats.frequency);
  corpusStats.relativeMOD       = relativize(corpusStats.MOD);
  corpusStats.relativePRED      = relativize(corpusStats.PRED);
  corpusStats.relativeREF       = relativize(corpusStats.REF);
  corpusStats.relativePREDbroad = relativize(corpusStats.PREDbroad);
  corpusStats.relativeREFbroad  = relativize(corpusStats.REFbroad);

}
