function average(nums) {
  return nums.reduce((acc, val) => acc + val, 0) / nums.length;
}

function median(arr) {
  const mid  = Math.floor(arr.length / 2);
  const nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

export default function getAverageFlexibility(lexemeStats) {

  const { flexibilityRatings, normalizedFlexibilityRatings } = Array.from(lexemeStats)
  .reduce((ratings, [, stats]) => {
    ratings.flexibilityRatings.push(stats.flexibility);
    ratings.normalizedFlexibilityRatings.push(stats.normalizedFlexibility);
    return ratings;
  }, {
    flexibilityRatings:           [],
    normalizedFlexibilityRatings: [],
  });

  const meanFlexibility             = average(flexibilityRatings);
  const meanNormalizedFlexibility   = average(normalizedFlexibilityRatings);
  const medianFlexibility           = median(flexibilityRatings);
  const medianNormalizedFlexibility = median(normalizedFlexibilityRatings);

  return {
    meanFlexibility,
    meanNormalizedFlexibility,
    medianFlexibility,
    medianNormalizedFlexibility,
  };

}
