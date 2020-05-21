function kthMax(list, k) {
    return kthMaxInner(list, 0, list.length - 1, k)
}

function kthMaxInner(list, start, end, k) {
    let middle = partition(list, start, end)
    while(middle + 1 !== k) {
        if (middle + 1 < k) {
            middle = partition(list, middle + 1, end)
        } else {
            middle = partition(list, start, middle - 1)
        }
    }
    return list[middle]
}

function partition(list, start, end) {
    const middle = list[end]
    let i = start
    for(let j = start; j < end; j++) {
        if (list[j] >= middle) {
            [list[i], list[j]] = [list[j], list[i]]
            i++
        }
    }

    [list[i], list[end]] = [list[end], list[i]]
    return i
}

console.log(kthMax([1, 4, 2, 3], 1))