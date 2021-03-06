/*
* 快速排序
* 先确定一个中间值，将所有小于中间值都放在该点的左侧，
*大于中间值的都放在该点的右侧，然后对左右两侧不断重复这个过程，直到所有排序完成
*/

// 互换两个位置的值
function swap (myArray, firstIndex, secondIndex) {
  [myArray[firstIndex], myArray[secondIndex]] = [myArray[secondIndex], myArray[firstIndex]]
  // es5
  // let temp = myArray[firstIndex]
  // myArray[firstIndex] = myArray[secondIndex]
  // myArray[secondIndex] = temp
}

// 完成一轮排序
function partition(myArray, left, right) {
  let pivot = myArray[Math.floor((right + left) / 2)]
  let i = left
  let j = right
  while (i <= j) {
    while (myArray[i] < pivot) {
      i++
    }
    while (myArray[j] > pivot) {
      j--
    }
    if (i <= j) {
      swap(myArray, i, j)
      i++
      j--
    }
  }
  return i;
}

// function quickSort(myArray, left, right) {
//   if (myArray.length < 2) return myArray
//   left = (typeof left !== "number" ? 0 : left)
//   right = (typeof right !== "number" ? myArray.length - 1 : right)
//   let index  = partition(myArray, left, right)
//   if (left < index - 1) {
//     quickSort(myArray, left, index - 1)
//   }
//   if (index < right) {
//     quickSort(myArray, index, right)
//   }
//   return myArray
// }


const quickSort = (list) => {
  if (!list || !list.length) return [];
  if (list.length === 1) return list;

  const [middle, ...rest] = list;
  const reducer = (acc, x) => (
      x <= middle ? 
      { ...acc, left: [...acc.left, x] } : 
      { ...acc, right: [...acc.right, x] }
  );
  const { left, right } = rest.reduce(reducer, { left: [], right: [] });
  return [...quickSort(left), middle, ...quickSort(right)];
};

const list = [2, 3, 1, 8, 8, 1, 2, 18, 6, 2333];
const sorted = quickSort(list); // [ 1, 1, 2, 2, 3, 6, 8, 8, 18, 2333 ]

// quickSort([2, 1, 5,4,7, 8])
export default quickSort