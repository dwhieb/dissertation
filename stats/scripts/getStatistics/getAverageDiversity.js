function average(nums) {
  return nums.reduce((acc, val) => acc + val, 0) / nums.length;
}

function median(arr) {
  const mid  = Math.floor(arr.length / 2);
  const nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

export default function getAverageDiversity(lexemeStats) {

  const { diversityRatings, normalizedDiversityRatings } = Array.from(lexemeStats)
  .reduce((ratings, [, stats]) => {
    ratings.diversityRatings.push(stats.diversity);
    ratings.normalizedDiversityRatings.push(stats.normalizedDiversity);
    return ratings;
  }, {
    diversityRatings:           [],
    normalizedDiversityRatings: [],
  });

  const meanDiversity             = average(diversityRatings);
  const meanNormalizedDiversity   = average(normalizedDiversityRatings);
  const medianDiversity           = median(diversityRatings);
  const medianNormalizedDiversity = median(normalizedDiversityRatings);

  return {
    meanDiversity,
    meanNormalizedDiversity,
    medianDiversity,
    medianNormalizedDiversity,
  };

}
