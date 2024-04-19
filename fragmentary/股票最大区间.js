function findMaxDrawdownRange(prices) {
  let maxPrice = 0;
  let maxDrawdown = 0;
  let start = 0;
  let end = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] > maxPrice) {
      maxPrice = prices[i];
      start = i;
    } else if (maxPrice - prices[i] > maxDrawdown) {
      maxDrawdown = maxPrice - prices[i];
      end = i;
    }
  }

  return [start, end];
}
