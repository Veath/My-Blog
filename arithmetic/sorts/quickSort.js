function quickSort(list) {
    if (!list.length) return []
    let partition = list.shift()
    
    const data = list.reduce((obj, item) => {
        if (item <= partition) {
            obj.left.push(item)
        } else {
            obj.right.push(item)
        }
        return obj
    }, {right: [], left: []})

    return [...quickSort(data.left), partition, ...quickSort(data.right)]
}

// console.log(quickSort([2,1,6]))

function quickSort2(list) {
    quickSortInner(list, 0, list.length - 1)
    return list
}

function quickSortInner(list, start, end) {
    if (start >= end) return

    const middle = partition(list, start, end)
    quickSortInner(list, start, middle - 1)
    quickSortInner(list, middle + 1, end)
}

function partition(list, start, end) {
    const prov = list[end]
    let index = start
    for(let i = start; i <end; i++) {
        if (list[i] < prov) {
            [list[i], list[index]] = [list[index], list[i]]
            index++
        }
    }
    [list[index], list[end]] = [list[end], list[index]]
    return index
}

console.log(quickSort2([2,1,6]))