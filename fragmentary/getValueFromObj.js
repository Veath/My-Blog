function getValueFromObj(context, keyPath) {
  var keys = keyPath.split('.'),
    key,
    cur = context,
    REG = /^(\w+)\[(\d+)\]$/;
  while ((key = keys.shift())) {
    if (cur === void 0) {
      return cur;
    }
    if (~key.indexOf('[')) {
      if (REG.test(key)) {
        var k1 = RegExp.$1,
          k2 = RegExp.$2;
        cur = cur[k1];
        if (cur) {
          cur = cur[k2];
        }
      } else {
        throw 'argument: ' + key + ' error';
      }
    } else {
      cur = cur[key];
    }
  }
  return cur;
}


export default getValueFromObj