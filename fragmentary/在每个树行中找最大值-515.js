/**
 * 您需要在二叉树的每一行中找到最大的值。

输入:

          1
         / \
        3   2
       / \   \
      5   3   9

输出: [1, 3, 9]
 */

function largestValues(tree) {
  const result = [];

  const queue = [tree];

  while (queue.length) {
    const node = queue.shift();
    result[node.level || 0] = (result[node.level || 0] || []).concat(
      node.value
    );

    if (node.left) {
      queue.push({ ...node.left, level: (node.level || 0) + 1 });
    }

    if (node.right) {
      queue.push({ ...node.right, level: (node.level || 0) + 1 });
    }
  }

  return result.map((item) => Math.max(...item));
}

console.log(
  largestValues({
    value: 1,
    left: { value: 3, left: { value: 5 }, right: { value: 3 } },
    right: { value: 2, right: { value: 9 } },
  })
);
