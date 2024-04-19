class ArrayQueue {
    constructor() {
        this.items = []
        this.capacity = 10
        this.head = 0
        this.tail = 0
    }
    enQueue(value) {
        if(this.tail === this.capacity) return
        this.items.push(value)
        this.tail++
    }
    deQueue() {
        if (this.tail === this.head) return
        const data = this.items[this.head]
        this.items[this.head] = null
        this.head++
        return data
    }
}

const queue = new ArrayQueue()
queue.enQueue(1)
queue.enQueue(2)
queue.enQueue(3)
queue.deQueue()
console.log(queue)