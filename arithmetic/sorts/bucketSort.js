function bucketSort(list) {
    const bucketCount = list.length
    const min = Math.min(...list)
    const max = Math.max(...list)
    const bucketSize = ~~((max - min) / bucketCount - 1)
    const bucketList = []

    list.forEach(item => {
        const index = ~~((item - min) / (bucketSize))
        bucketList[index] = bucketList[index] || []
        bucketList[index].push(item)
    })

    let j = 0
    const data = []
    bucketList.forEach(item => {
        quickSort(item, 0, item.length -1)
        item.forEach(i => {
            data[j++] = i
        })
    })



    return data
}

function quickSort(list, start, end) {
    if (start >= end) return
    const middle = partition(list, start, end)
    quickSort(list, start, middle - 1)
    quickSort(list, middle + 1, end)
}

function partition(list, start, end) {
    const pov = list[end]
    let index = 0
    for(let i = start; i < end; i++) {
        if(list[i] <= pov) {
            [list[i], list[index]] = [list[index], list[i]]
            index++
        }
    }
    
    [list[index], list[end]] = [list[end], list[index]]
    return index
}

console.log(bucketSort([3,1,2, 4]))