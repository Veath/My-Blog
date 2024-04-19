/**
 * 深度遍历
 * 输入:

   1
 /   \
2     3
 \
  5

输出: ["1->2->5", "1->3"]

解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
 */
function binaryTreePaths(tree) {
  const result = [];

  const loop = (node, preArr) => {
    if (!node) {
      return;
    }

    if (!node.right && !node.left) {
      result.push([...preArr, node.value].join('->'));
    }

    if (node.left) {
      loop(node.left, [...preArr, node.value]);
    }

    if (node.right) {
      loop(node.right, [...preArr, node.value]);
    }
  };

  loop(tree, []);

  return result;
}

binaryTreePaths({
  value: 1,
  left: { value: 2, right: { value: 5 } },
  right: { value: 3 },
});
