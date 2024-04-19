class CircularQueue {
    constructor() {
        this.capacity = 3
        this.head = 0
        this.tail = 0
        this.items = []
    }
    enQueue(value) {
        if (((this.tail + 1) % this.capacity) === this.head) return
        this.items[this.tail] = value
        this.tail = (this.tail + 1) % this.capacity
    }
    deQueue() {
        if(this.head === this.tail) return
        const data = this.items[this.head]
        this.head = (this.head + 1) % this.capacity

        return data
    }
}