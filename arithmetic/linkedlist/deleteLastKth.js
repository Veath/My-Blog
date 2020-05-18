function deleteLastKth(list, k) {
    let i = 1
    let fast = list
    while(i < k && fast != null) {
        fast = fast.next
        ++i
    }
    
    let pre = null
    let slow = list
    while(fast.next != null) {
        fast = fast.next
        pre = slow
        slow = slow.next
    }

    if (pre == null) {
        list = list.next
    } else {
        pre.next = pre.next.next
    }
    return list
}

console.log(deleteLastKth({value: 1, next: {value: 2}}, 1))