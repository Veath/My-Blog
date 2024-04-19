/**
 * 例：
[2, 6]、[1, 4]、[5, 8]
交集为：
[2, 4]、[5, 6]

注：
第一个解的意思是 [2, 6]、[1, 4]的区间为[2, 4]
第二个解的意思是 [2, 6]、[5, 8]的区间为[5, 6]
 */

function intersection(list) {
  const data = [];
  list.forEach((item, index) => {
    const iMax = Math.max(...item);
    const iMin = Math.min(...item);

    for (let j = index + 1; j < list.length; j++) {
      const jMax = Math.max(...list[j]);
      const jMin = Math.min(...list[j]);

      if (iMin <= jMax && jMax <= iMax && jMin <= iMin) {
        data.push([iMin, jMax]);
      } else if (jMin <= iMax && iMax <= jMax && iMin <= jMin) {
        data.push([jMin, iMax]);
      } else if (iMin >= jMin && iMin <= jMax && iMax <= jMax) {
        data.push([jMin, jMax]);
      } else if (jMin >= iMin && jMin <= iMax && jMax <= iMax) {
        data.push([iMin, iMax]);
      }
    }
  });

  return data;
}

function intersection(list) {
  const newList = list
    .map((item) => item.sort((a, b) => a - b))
    .sort((a, b) => a[0] - b[0]);

  const data = [];

  for (let i = 1; i < newList.length; i++) {
    const current = newList[i];
    const pre = newList[i - 1];
    if (current[0] > pre[1]) {
      continue;
    }

    data.push([Math.max(pre[0], current[0]), Math.min(pre[1], current[1])]);
  }

  return data;
}

console.log(
  intersection([
    [2, 6],
    [1, 4],
    [5, 8],
  ])
);

/**
 * 所有共同交集
 * @param {array} arr
 */
function intersection(arr) {
  const list = arr
    .map((item) => {
      if (item[0] < item[1]) {
        return item;
      } else {
        return [item[1], item[0]];
      }
    })
    .sort((a, b) => a[0] - b[0]);

  let temp = list.shift();

  list.forEach((item, index) => {
    if (item[0] > temp[1]) {
      temp = null;
      return;
    }

    if (item[0] >= temp[0] && item[0] <= temp[1]) {
      temp[0] = item[0];
    }

    if (item[1] < temp[1]) {
      temp[1] = item[1];
    }
  });
  return temp;
}
