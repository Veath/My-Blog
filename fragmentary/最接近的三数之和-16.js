/**
 * 给定一个包括  n 个整数的数组  nums  和 一个目标值  target。
 * 找出  nums  中的三个整数，使得它们的和与  target  最接近。
 * 返回这三个数的和。假定每组输入只存在唯一答案。
输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
递归解法
 */

function sum3(data, target) {
  let result = null;
  let num;

  const loop = (start, sum, preArray) => {
    if (preArray.length === 3) {
      if (
        num === undefined ||
        Math.abs(sum - target) <= Math.abs(num - target)
      ) {
        num = sum;
        result = preArray;
      }
      return;
    }

    let limit = 3 - preArray.length;
    for (let i = start; i < data.length; i++) {
      if (3 - i + 1 < limit) {
        continue;
      }
      loop(i + 1, sum + data[i], [...preArray, data[i]]);
    }
  };

  loop(0, 0, []);

  return [num, result];
}

sum3([-1, 2, 1, -4], 1);

/**
 * 双指针解法
 * @param {} nums
 * @param {*} target
 */
let threeSumClosest = function (nums, target) {
  let n = nums.length;
  if (n === 3) {
    return getSum(nums);
  }
  // 先升序排序 此为解题的前置条件
  nums.sort((a, b) => a - b);

  let min = Infinity; // 和 target 的最小差
  let res;

  // 从左往右依次尝试定一个基础指针 右边至少再保留两位 否则无法凑成3个
  for (let i = 0; i <= nums.length - 3; i++) {
    let basic = nums[i];
    let left = i + 1; // 左指针先从 i 右侧的第一位开始尝试
    let right = n - 1; // 右指针先从数组最后一项开始尝试

    while (left < right) {
      let sum = basic + nums[left] + nums[right]; // 三数求和
      // 更新最小差
      let diff = Math.abs(sum - target);
      if (diff < min) {
        min = diff;
        res = sum;
      }
      if (sum < target) {
        // 求出的和如果小于目标值的话 可以尝试把左指针右移 扩大值
        left++;
      } else if (sum > target) {
        // 反之则右指针左移
        right--;
      } else {
        // 相等的话 差就为0 一定是答案
        return sum;
      }
    }
  }

  return res;
};

function getSum(nums) {
  return nums.reduce((total, cur) => total + cur, 0);
}
