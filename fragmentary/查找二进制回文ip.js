var findSpecialIP = function () {
  let res = [];
  let m = new Map();
  let group = [];
  var isPalindrome = function (x) {
    // 检查回文
    return x.toString() == x.toString().split('').reverse().join('');
  };
  let hasRepeatNum = function (...args) {
    let a = args.toString();
    let b = [...new Set(a.split(''))];
    return a.length !== b.length;
  };
  let lenIs10 = function (...args) {
    return args[0].join('').length === 10;
  };
  let getIp = function ([a, b], [c, d]) {
    //[16,8] [32,4]
    return [
      `${a}.${c}.${d}.${b}`,
      `${b}.${c}.${d}.${a}`,
      `${a}.${d}.${c}.${b}`,
      `${b}.${d}.${c}.${a}`,
    ];
  };
  for (let i = 0; i < 256; i++) {
    if (!hasRepeatNum(i) || i < 11) {
      let self = i.toString(2).padStart(8, 0); // 转为2进制后一共需要8位并补0
      let re = self.split('').reverse().join(''); // 翻转
      if (!isPalindrome(self)) {
        //如果不是回文
        if (m.has(self)) {
          // i 和 num 对称 组成回文
          let num = m.get(self);
          if (!hasRepeatNum(i, num)) {
            group.push([i, num]);
          }
        } else {
          m.set(re, i);
        }
      }
    }
  }
  for (let i = 0; i < group.length; i++) {
    let a = group[i];
    for (let j = i + 1; j < group.length; j++) {
      let b = group[j];
      if (!hasRepeatNum(a.join(''), b.join('')) && lenIs10(a.concat(b))) {
        res = res.concat(getIp(group[i], group[j]));
      }
    }
  }
  return res;
};
findSpecialIP();
