/**
 * /** 2. 寻找特定 IP
IPV4 的 IP 地址是32位的二进制数，为增强可读性，通常我们以8位为1组进行分割，
用十进制来表示每一部分，并用点号连接，譬如 192.168.1.1。显然，存在这样的 IP 地址，
0到9十个数字各出现一次。具备这样特征的 IP 地址里，表示成二进制数时，二进制数左右对称
（也就是“回文”，表示成32位二进制不省略0）的情况有几种，分别是哪些？要求性能尽可能高
*/
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
