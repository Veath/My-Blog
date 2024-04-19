function insertSort(list) {
    for(let i = 1; i < list.length; i++) {
        const value = list[i]
        for(var j = i - 1; j >=0; j--) {
            if (value < list[j]) {
                list[j+1] = list[j]
            } else {
                break
            }
        }
        list[j+1] = value
    }
    return list
}

console.log(insertSort([2,1,0]))