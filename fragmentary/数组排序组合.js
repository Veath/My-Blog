let input = [
  { id: '17', caption: '颜色', types: ['黑', '棕'] },
  { id: '23', caption: '材质', types: ['牛皮'] },
  { id: '24', caption: '尺码', types: ['40', '41', '42'] },
];

let output = [
  { 17: '黑', 23: '牛皮', 24: '40' },
  { 17: '黑', 23: '牛皮', 24: '41' },
  { 17: '黑', 23: '牛皮', 24: '42' },
  { 17: '棕', 23: '牛皮', 24: '40' },
  { 17: '棕', 23: '牛皮', 24: '41' },
  { 17: '棕', 23: '牛皮', 24: '42' },
];

function transform(input) {
  const temp = input.shift();
  const queue = [...temp.types];
  let result = [];

  while (queue.length) {
    const item = queue.shift();
    let data = [{ [temp.id]: item }];

    input.forEach((inp, index) => {
      let cache = [];
      inp.types.forEach((i) => {
        data.forEach((j) => {
          cache.push({ ...j, [inp.id]: i });
        });
      });
      data = cache;
    });
    result = result.concat(data);
  }

  return result;
}

function transform(data, result = []) {
  if (!data.length) return result;

  const temp = data.shift();

  if (!result.length) {
    return transform(
      data,
      temp.types.map((item) => ({ [temp.id]: item }))
    );
  }

  const newResult = [];

  for (let i of result) {
    for (let j of temp.types) {
      newResult.push({ ...i, [temp.id]: j });
    }
  }

  return transform(data, newResult);
}

console.log(
  transform([
    { id: '17', caption: '颜色', types: ['黑', '棕'] },
    { id: '23', caption: '材质', types: ['牛皮'] },
    { id: '24', caption: '尺码', types: ['40', '41', '42'] },
  ])
);

function combination(list, lastResult = []) {
  if (!list.length) return lastResult;
  let subList = list.shift();
  if (!subList.length) return lastResult;
  if (!lastResult.length) {
    return combination(
      list,
      subList.map((item) => [item])
    );
  }

  let result = [];
  for (let res of lastResult) {
    for (let item of subList) {
      result.push([...res, item]);
    }
  }
  return combination(list, result);
}

let formats = [
  [
    { id: 1, name: '红色' },
    { id: 2, name: '白色' },
  ],
  [
    { id: 1, name: '100*200' },
    { id: 2, name: '50*200' },
  ],
  [
    { id: 1, name: '20厘米' },
    { id: 2, name: '10厘米' },
  ],
];

console.log(JSON.stringify(combination(formats)));

let names = ['iPhone X', 'iPhone XS'];

let colors = ['黑色', '白色'];

let storages = ['64g', '256g'];

let combine = function (...chunks) {
  let res = [];

  let helper = function (chunkIndex, prev) {
    let chunk = chunks[chunkIndex];
    let isLast = chunkIndex === chunks.length - 1;
    for (let val of chunk) {
      let cur = prev.concat(val);
      if (isLast) {
        // 如果已经处理到数组的最后一项了 则把拼接的结果放入返回值中
        res.push(cur);
      } else {
        helper(chunkIndex + 1, cur);
      }
    }
  };

  // 从属性数组下标为 0 开始处理
  // 并且此时的 prev 是个空数组
  helper(0, []);

  return res;
};

console.log(combine(names, colors, storages));

/**
 * 
输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
 */
let combine = function (n, k) {
  let ret = [];

  let helper = (start, prev) => {
    let len = prev.length;
    if (len === k) {
      ret.push(prev);
      return;
    }

    // 还有 rest 个位置待填补
    let rest = k - prev.length;
    for (let i = start; i <= n; i++) {
      if (n - i + 1 < rest) {
        continue;
      }
      helper(i + 1, prev.concat(i));
    }
  };
  helper(1, []);
  return ret;
};

console.log(combine(4, 2));

/** 可以重复使用里面的数字
  * 示例 1:

输入: candidates = [2,3,6,7], target = 7,
所求解集为:
[
  [7],
  [2,2,3]
]
示例 2:

输入: candidates = [2,3,5], target = 8,
所求解集为:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
  */
let combinationSum = function (candidates, target) {
  let res = [];

  let helper = (start, prevSum, prevArr) => {
    // 由于全是正整数 所以一旦和大于目标值了 直接结束本次递归即可。
    if (prevSum > target) {
      return;
    }
    // 目标值达成
    if (prevSum === target) {
      res.push(prevArr);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      // 这里还是继续从start本身开始 因为多个重复值是允许的
      let cur = candidates[i];
      let sum = prevSum + cur;
      let arr = prevArr.concat(cur);
      helper(i, sum, arr);
    }
  };

  helper(0, 0, []);

  return res;
};

/**
 * 不可以重复使用数字
 * 示例 1:

输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
示例 2:

输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(list, target) {
  const result = [];
  const cache = new Set();

  const l = list.sort();

  const loop = (start, sum, preArr) => {
    if (sum > target) {
      return;
    }

    if (cache.has(preArr.toString())) {
      return;
    }

    if (sum === target) {
      result.push(preArr);
      cache.add(preArr.toString());
    }

    for (let i = start; i < l.length; i++) {
      loop(i + 1, sum + l[i], [...preArr, l[i]]);
    }
  };

  loop(0, 0, []);
  return result;
}

/**
 * 输入: [1,2,2]
输出:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  let n = nums.length;
  let res = [];
  if (!n) {
    return res;
  }

  nums.sort();

  let used = {};

  let helper = (start, prev, target) => {
    if (prev.length === target) {
      let key = genKey(prev);
      if (!used[key]) {
        res.push(prev);
        used[key] = true;
      }
      return;
    }

    for (let i = start; i < n; i++) {
      let rest = n - i;
      let need = target - prev.length;
      if (rest < need) {
        continue;
      }
      helper(i + 1, prev.concat(nums[i]), target);
    }
  };

  for (let i = 1; i <= n; i++) {
    helper(0, [], i);
  }

  return [[], ...res];
};

function genKey(arr) {
  return arr.join('~');
}
