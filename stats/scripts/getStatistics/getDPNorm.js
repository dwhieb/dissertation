export default function getDPNorm(DP, smallestTextSize) {
  return Math.min(DP / (1 - smallestTextSize), 1);
  // NB: Taking the minimum ensures that the maximum value of DPnorm is 1
  // Occasionally JS rounding errors cause it to go above 1
}
