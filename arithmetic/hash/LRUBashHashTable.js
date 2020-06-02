import { HashTable } from './hashTable';

class LRUBashHashTable {
  constructor() {
      this.table = new HashTable()
      this.head = createNode()
      this.tail = createNode()
      this.length = 0
      this.capacity = 10
  }
  add(key, value) {
      const node = this.table.get(key)
      if (node) {
          this.moveToHead(node)
      } else {
          const newNode = createNode(key, value)
          this.table.put(key, newNode)
          this.addNode(newNode)
         
          if (++this.length > this.capacity) {
            const tail = this.popTail()
            this.remove(tail.key)
          }

      }
  }
  addNode(node) {
      node.next = this.head.next
      node.prev = this.head

      node.next.prev = node
      this.head.next = node

  }
  removeNode(node) {
      node.prev.next = node.next
      node.next.prev = node.prev
  }
  popTail() {
      return this.tail.prev
  }
  moveToHead(node) {
      this.removeNode(node)
      this.addNode(node)
  }
  get(key) {
      const node = this.table.get(key)
      
      if (node == null) return
      
      this.moveToHead(node)
      return node
  }
  remove(key) {
      const node = this.table.get(key)

      if (node == null) return

      this.removeNode(node)
      this.table.delete(key)
      this.length--
  }
}

function createNode(key, value) {
  return { key, data: value, next: null, prev: null };
}
