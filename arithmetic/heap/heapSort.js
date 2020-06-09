function heapSort(arr) {
    if(arr.length <=1) return arr

    buildHeap(arr)
    let i = arr.length - 1
    while(i >= 0) {
        swap(arr, 0, i)
        heapfity(arr, --i, 0)
    } 
    return arr
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}

function buildHeap(arr) {
    for(let i = ~~((arr.length - 2) / 2); i >= 0; i--) {
        heapfity(arr, arr.length - 1, i)
    }
}

function heapfity(arr, len, index) {
    let i = index
    let position = index
    while(true) {
        let left = i * 2 + 1
        let right = i * 2 + 2
        if(left <= len &&  arr[left] > arr[i]) position = left
        if(right <= len && arr[right] > arr[position]) position = right
        if(i === position) return
        swap(arr, i, position)
        i = position
    }
}

heapSort([3,1, 2, 4,9,6,8])