function mergeSort(list) {
    mergeSortInner(list, 0, list.length - 1)
    return list
}

function mergeSortInner(list, start, end) {
    if(start >= end) return

    const middle = start + (end - start) / 2 | 0

    mergeSortInner(list, start, middle)
    mergeSortInner(list, middle+1, end)

    merge(list, start, middle, end)
}

function merge(list, start, middle, end) {
    let i = start
    let j = middle + 1
    let temp = []

    while(i<=middle && j <= end) {
        if(list[i] <= list[j]) {
            temp.push(list[i])
            i++
        }  else {
            temp.push(list[j])
            j++
        }
    }

    let s = start
    let e = middle
    if (j <= end) {
        s = j
        e = end
    }

    while(s <= e) {
        temp.push(list[s])
        s++
    }

    for(let i = 0; i <= end - start; i++) {
        list[start + i] = temp[i]
    } 

}


console.log(mergeSort([2,1,5]))