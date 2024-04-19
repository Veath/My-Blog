function bubbleSort(list) {
    let border = list.length - 1
    let lastChange = 0;
    for(let i = 0; i < list.length; i++) {
        let sorted = true
        for(let j = 0; j < border - i; j++) {
            if (list[j] > list[j+1]) {
                [list[j], list[j+1]] = [list[j+1], list[j]]
                sorted = false
                lastChange = j
            }
        }
        if (sorted) break;
        border = lastChange
    }
    return list
}

console.log(bubbleSort([2,1,0]))