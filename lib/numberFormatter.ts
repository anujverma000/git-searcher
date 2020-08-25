/**
 * Formats the number to K, M and B format for UI
 *
 * e.g: we use it show number of stars of the repo
 *  1000 -> 1K
 *  1000000 -> 1M
 *  100000000 -> 1B
 */

const numberFormatter = (num: number): string => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}G`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return `${num}`;
};

export default numberFormatter;
