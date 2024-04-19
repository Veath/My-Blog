const getAZ = () => {
  var arr = [];
  for (var i = 65; i < 91; i++) {
    arr.push(String.fromCharCode(i));
  }
  return arr;
};
const getColumnKey = (num) => {
  const keys = getAZ();
  if (num <= keys.length) {
    return keys[num - 1];
  } else {
    const x = Math.ceil(num / keys.length);
    const y = num % keys.length;
    return getColumnKey(x - 1) + keys[(y || keys.length) - 1];
  }
};

getColumnKey(1000);

const getColumnKey2 = (n) => {
  const result = [];
  while (n > 0) {
    n--;
    const char = n % 26;
    result.unshift(String.fromCharCode(65 + char));
    n = Math.floor(n / 26);
  }
  return result.join('');
};

getColumnKey2(1000);

const getColumnKey3 = (num) => {
  const keys = getAZ();
  num--;
  if (num < keys.length) {
    return keys[num];
  } else {
    const x = Math.floor(num / keys.length);
    const y = num % keys.length;
    return getColumnKey(x) + keys[y];
  }
};
