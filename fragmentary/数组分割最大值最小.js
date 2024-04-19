/**
 * 输入：nums = [7,2,5,10,8], m = 2
输出：18
解释：
一共有四种方法将 nums 分割为 2 个子数组。 其中最好的方式是将其分为 [7,2,5] 和 [10,8] 。
因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。


输入：nums = [1,2,3,4,5], m = 2
输出：9

 * @param {*} nums 
 * @param {*} m 
 */
function splitArray(nums, m) {
  let left = 0;
  let right = 0;

  for (let i = 0; i < nums.length; i++) {
    right += nums[i];
    if (left < nums[i]) {
      left = nums[i];
    }
  }
  while (left < right) {
    let mid = Math.floor((right - left) / 2 + left);
    if (check(nums, mid, m)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

function check(nums, x, m) {
  let sum = 0;
  let cnt = 1;

  for (let i = 0; i < nums.length; i++) {
    if (sum + nums[i] > x) {
      cnt++;
      sum = nums[i];
    } else {
      sum += nums[i];
    }
  }
  return cnt <= m;
}

splitArray([1, 2, 3, 4, 5], 2);
