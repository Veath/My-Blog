function selectSort(list) {
    for(let i = 0; i < list.length; i++) {
        let min = i
        for(let j = i + 1; j < list.length; j++) {
            if (list[j] < list[min]) {
                min = j
            }
        }
        [list[min], list[i]] = [list[i], list[min]]
    }

    return list
}

console.log(selectSort([3,1,4]))