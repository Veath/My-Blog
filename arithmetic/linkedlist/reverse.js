function reverse(list) {
    let pre = null
    while(list) {
        const next = list.next
        list.next = pre
        pre = list
        list = next
    }
    return pre
}

const list = {value: 1, next: {value: 2, next: {value: 3}}}
console.log(reverse(list))