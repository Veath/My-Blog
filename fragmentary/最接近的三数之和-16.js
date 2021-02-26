/**
 * 给定一个包括  n 个整数的数组  nums  和 一个目标值  target。
 * 找出  nums  中的三个整数，使得它们的和与  target  最接近。
 * 返回这三个数的和。假定每组输入只存在唯一答案。
输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
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

    for (let i = start; i < data.length; i++) {
      loop(i + 1, sum + data[i], [...preArray, data[i]]);
    }
  };

  loop(0, 0, []);

  return [num, result];
}

sum3([-1, 2, 1, -4], 1);
