function createNode(value) {
    return {value,next: null}
}

function mergeTwoList(l1, l2) {
    const head = createNode(null)
    let temp = head
    
    while(l1 != null && l2 != null) {
        if(l1.value < l2.value) {
            temp.next = l1
            l1 = l1.next
        } else {
            temp.next = l2
            l2 = l2.next
        }
        temp = temp.next
    }
    if (l1 != null) temp.next = l1
    if (l2 != null) temp.next = l2
    return head.next
}

console.log(mergeTwoList({value: 1, next: {value: 3}}, {value: 2}))