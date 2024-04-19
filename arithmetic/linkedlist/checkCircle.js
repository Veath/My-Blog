function checkCircle(list) {
    let fast = list
    let slow = list

    while(fast != null && fast.next != null) {
        slow = slow.next
        fast = fast.next.next
        if (fast === slow) {
            return true
        }
    }
    return false
}

const a = {value: 1, next: null}
const b = {value: 2, next: null}
const c = {value: 3, next: null}
a.next = b
b.next = c
// c.next = a
console.log('----',checkCircle(a))