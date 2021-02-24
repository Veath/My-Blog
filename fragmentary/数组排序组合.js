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
    let data = [];
    const item = queue.shift();
    input.forEach((inp, index) => {
      let cache = [];
      inp.types.forEach((i) => {
        if (!index) {
          cache.push({ [temp.id]: item, [inp.id]: i });
        } else {
          data.forEach((j) => {
            cache.push({ ...j, [inp.id]: i });
          });
        }
      });
      data = cache;
      cache = [];
    });
    result = result.concat(data);
  }

  return result;
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
