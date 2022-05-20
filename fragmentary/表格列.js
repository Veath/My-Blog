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
