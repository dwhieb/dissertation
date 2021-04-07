import sum from '../../../scripts/utilities/sum.js';

/**
 * Computes Shannon's H (normalized), a relative entropy measure
 * @param  {Array<Number>} frequencies An array of numbers to calculate entropy for
 * @return {Number}                    Returns a value between 0 (data is skewed) and 1 (variables are equally frequent)
 */
export default function getRelativeEntropy(values) {

  const sumValues = sum(values);

  const calculatedValues = values.map(value => {
    const percent = value / sumValues;
    return percent * (percent === 0 ? 0 : Math.log(percent));
  });

  return Math.abs(-sum(calculatedValues) / Math.log(values.length));

}
