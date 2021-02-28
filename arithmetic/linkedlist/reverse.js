function reverse(list) {
  let pre = null;
  while (list) {
    const next = list.next;
    list.next = pre;
    pre = list;
    list = next;
  }
  return pre;
}

const list = { value: 1, next: { value: 2, next: { value: 3 } } };
console.log(reverse(list));

function reverse(head) {
  const loop = (node, prev) => {
    if (!node) return prev;

    const temp = node.next;
    node.next = prev;

    return loop(temp, node);
  };

  return loop(head, null);
}
