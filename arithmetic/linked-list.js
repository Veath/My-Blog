// 反转链表
function reverseList(node) {
  let headNode = node
  let tempNode

  while(node && node.next) {
    tempNode = node.next
    node.next = tempNode.next
    tempNode.next = headNode
    headNode = tempNode
  }

  return headNode
}
