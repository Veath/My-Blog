function printPermutations(data, n, k) {
    if (k == 1) {
       const arr = []
      for (let i = 0; i < n; ++i) {
        arr.push(data[i] + " -- ");
      }
       console.log(arr.toString())
    }
  
    for (let i = 0; i < k; ++i) {
      var tmp = data[i];
      data[i] = data[k-1];
      data[k-1] = tmp;
  
      printPermutations(data, n, k - 1);
  
      tmp = data[i];
      data[i] = data[k-1];
      data[k-1] = tmp;
    }
  }

  printPermutations([1,2, 3, 4], 4, 4)
