const bubblingSort = function (arr) {
    for (let i = arr.length - 1; i > 0; i-- ) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j+1]) {
                const stance = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = stance;
            }
        }
    }
    return arr;
}

const bubblingSort2 = function (arr) {
    for (let i = arr.length - 1; i > 0; i-- ) {
        let sorted = true;
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j+1]) {
                const stance = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = stance;
                sorted = false;
            }
        }
        if (sorted) return arr;
    }
}

const bubblingSort3 = function (arr) {
    for (let i = arr.length - 1; i > 0; i-- ) {
        let sorted = true;
        let eachNum = i;
        let recordSide = 0;
        for (let j = 0; j < eachNum; j++) {
            if (arr[j] > arr[j+1]) {
                const stance = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = stance;
                sorted = false;
                recordSide = j;
            }
        }
        recordSide = recordSide;
        if (sorted) return arr;
    }
}