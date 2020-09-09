/**
 * Computes Shannon's H (normalized), a relative entropy measure
 * @param  {Array<Number>} frequencies An array of numbers
 * @return {Number}                    Returns a value between 0 (data is skewed) and 1 (variables are equally frequent)
 */
function getRelativeEntropy(values) {

  const sum = values.reduce((acc, val) => acc + val, 0);

  return -values.reduce();

}
