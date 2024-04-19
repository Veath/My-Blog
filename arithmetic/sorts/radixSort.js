function radixSort(list) {
    const max = Math.max(...list)

    for(let i = 1; max / i > 0; i *=10 ) {
        list = countingSort(list, i)
    }

    return list
}

function countingSort(list, num) {
    const countList = new Array(10).fill(0)
    for(let i = 0; i < list.length; i++) {
        countList[~~(list[i] / num % 10)]++
    }

    for(let i = 1; i < countList.length; i++) {
        countList[i] += countList[i - 1]
    }

    const data = []
    for(let i = list.length - 1; i >=0; i--) {
        data[countList[~~(list[i] / num % 10)] - 1] = list[i]
        countList[~~(list[i] / num % 10)]--
    }

    return data
} 


console.log(radixSort([123, 121, 321]))