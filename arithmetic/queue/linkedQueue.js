class LinkedQueue {
    constructor() {
        this.head = null
        this.tail = null
    }
    enQueue(value) {
        const node = {value, next: null}
        if(!this.tail) {
            this.head = this.tail = node
        } else {
            this.tail.next = node
            this.tail = node
        }
    }
    deQueue() {
        if (!this.head) return
        const data = this.head.value
        this.head = this.head.next
        if (!this.head) {
            this.tail = null
        }

        return data
    }
}