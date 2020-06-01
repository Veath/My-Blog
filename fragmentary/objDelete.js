function recover(obj) {
    innerRecover(obj);
    return obj;
  }
  
  function innerRecover(obj) {
    if (!Object.keys(obj).length) return true;
  
    let canDeleteObj = true
    for (let key in obj) {
      let canDeleteKey = true;
  
      if (typeof obj[key] === 'object' && obj[key] != null) {
        canDeleteKey = innerRecover(obj[key]);
      } else if (obj[key] == null) {
        canDeleteKey = true;
      } else {
        canDeleteKey = false;
      }
  
      if (canDeleteKey) {
        delete obj[key];
      } else {
          canDeleteObj = false
      }
    }
  
    return canDeleteObj;
  }
  
  console.log(recover({a: {d: {f: 1}}, b: {g: {e: null, gg: 1}}}))