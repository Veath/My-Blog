function countingSort(list) {
    const max = Math.max(...list)
    const countList = new Array(max).fill(0)
    list.forEach(item => {countList[item] = (countList[item] || 0) + 1})
    
    for(let i = 1; i < countList.length; i++) {
        countList[i] = countList[i - 1] + countList[i]
    }

    const data = []
    for(let i = list.length - 1; i >=0; i--) {
        data[countList[list[i]] - 1] = list[i]
        countList[list[i]]--
    }

    return data
}

console.log(countingSort([3,1,4]))