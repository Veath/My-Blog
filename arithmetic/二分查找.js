function binSearch(target, arr, start, end) {
    var start = start || 0;
    var end = end || arr.length - 1; 
    start >= end ? -1 : ''; 
    var mid = Math.floor((start + end) / 2);
    if (target == arr[mid]) {
      return mid; 
    } else if (target > arr[mid]) {
    return binSearch(target, arr, mid + 1, end);
    } else {
        return binSearch(target, arr, start, mid - 1);
    }
  }
  
   binSearch(5,[1,2,3,4,5,6,7,8])
  