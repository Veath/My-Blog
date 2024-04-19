function bSearch(list, value) {
    return bSearchInner(list, 0, list.length - 1, value)
}

function bSearchInner(list, start, end, value) {
    if(list.length <= 0) return

    const middle = ~~(start + (end- start) / 2)
    if(list[middle] === value) {
        return middle
    } else if (list[middle] > value) {
        return bSearchInner(list, start, middle - 1, value)
    } else {
        return bSearchInner(list, middle + 1, end, value)
    }
}

console.log(bSearch([1,3,5], 5))


// 查找第一个值等于给定值的元素
function bSearch1(list, value) {
    let low = 0
    let height = list.length - 1

    while(low <= height) {
        const middle = ~~(low + (height - low) / 2)
        if(list[middle] > value) {
            height = middle - 1
        } else if (list[middle] < value) {
            los = middle + 1
        } else {
            if(mid === 0 || list[middle - 1] !== value) return middle
            else height = middle - 1
        }
    }
}

// 查找最后一个值等于给定值的元素
function bSearch2(list, value) {
    let low = 0
    let height = list.length - 1

    while(low <= height) {
        const middle = ~~(low + (height - low) / 2)
        if (list[middle] > value) {
            height = middle - 1
        } else if (list[middle] < value) {
            low = middle + 1
        } else {
            if(middle === list.length - 1 || list[mid + 1] !== value) return middle
            else low = middle + 1
        }
    }
}

// 查找第一个大于等于给定值的元素
function bSearch3(list, value) {
    let low = 0
    let height = list.length - 1

    while(low <= height) {
        const middle = ~~(low + (height - low) / 2)
        if (list[middle] >= value) {
            if (middle === 0 || list[middle - 1] < value) {
                return middle
            }
            height = middle - 1
        } else if (list[middle] < value) {
            low = middle + 1
        }
    }
}

// 查找最后一个小于等于给定值的元素
function bSearch4(list, value) {
    let low = 0
    let height = list.length - 1

    while(low <= height) {
        const middle = ~~(low + (height - low) / 2)
        if (list[middle] > value) {
            height = middle - 1
        } else if (list[middle] <= value) {
            if (middle === list.length - 1 || list[middle + 1] > value) {
                return middle
            }
            low = middle + 1
        }
    }
}