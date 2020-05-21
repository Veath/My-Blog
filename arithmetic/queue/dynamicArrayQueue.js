class DynamicArrayQueue {
    constructor() {
        this.items = []
        this.capacity = 2
        this.head = 0
        this.tail = 0
    }
    enQueue(value) {
        if(this.tail === this.capacity && this.head === 0) return

        if (this.tail === this.capacity) {
            for(let i = this.head; i< this.capacity; i++) {
                this.items[i - this.head] = this.items[i]
                this.items[i] = null
            }
            this.tail -= this.head
            this.head = 0
        }

        this.items[this.tail] = value
        this.tail++
    }
    deQueue() {

        const data = this.items[this.head]
        this.items[this.head] = null
        this.head++
        return data
    }
}

const queue = new DynamicArrayQueue()
queue.enQueue(1)
queue.enQueue(2)
queue.deQueue()
queue.enQueue(3)
console.log(queue)