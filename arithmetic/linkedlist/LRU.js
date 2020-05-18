class LRU {
  constructor() {
    this.capacity = 10;
    this.count = 0;
    this.headNode = this.createNode()
  }
  createNode(value) {
    return { data: value, next: null };
  }
  findPreNode(value) {
      let node = this.headNode
      while(node.next != null) {
          if(node.next.data === value) {
              return node
          }
          node = node.next
      }
      return null
  }
  add(value) {
    const preNode = this.findPreNode(value)
    if (preNode != null) {
        this.deleteAt(preNode)
    } else if(this.count >= this.capacity ) {
        this.deleteEnd()
    }
    this.insert2Head(value)
  }
  insert2Head(value) {
      const node = this.createNode(value)
      node.next = this.headNode.next
      this.headNode.next = node
  }
  deleteAt(node) {
      node.next = node.next.next
      this.count--
  }
  deleteEnd() {
    let node = this.headNode
    while(node.next.next != null) {
        node = node.next
    }
    node.next = null
    this.count--
  }
}

const lru = new LRU()
lru.add(1)
lru.add(2)
lru.add(3)
lru.add(1)
console.log(JSON.stringify(lru))