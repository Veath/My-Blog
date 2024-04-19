/**
 * 输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2,2]
示例 2:

输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [4,9]
 */

function intersect(a, b) {
  const count1 = getCount(a);
  const count2 = getCount(b);

  const list1 = new Set(a);
  const list2 = new Set(b);

  const result = [];

  list1.forEach((value) => {
    if (list2.has(value)) {
      result.push(
        new Array(...Math.min(count1[value], count2[value])).fill(value)
      );
    }
  });

  return result;
}

function getCount(list) {
  return list.reduce((obj, item) => {
    obj[item] = (obj[item] || 0) + 1;

    return obj;
  }, {});
}
