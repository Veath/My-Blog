function recoverNest2Plan(obj) {
    const data = {};
    const queue = [];
  
    function search(target) {
      for (let i in target) {
        if (target.hasOwnProperty(i)) {
          queue.push(i);
          if (Object.prototype.toString.call(target[i]) === '[object Object]') {
            search(target[i]);
          } else {
            data[queue.join('.')] = target[i];
          }
          queue.pop();
        }
      }
    }
  
    search(obj);
    return data;
  }

  
  function recoverPlan2Nest(obj) {
      const data = {}
      
  
      for(let i in obj) {
          if (!obj.hasOwnProperty(i)) return
          let temp = data
          const keys = i.split('.')
          keys.forEach((key, index) => {
              if (index === keys.length - 1) return
              temp[key] = temp[key] || {}
              temp = temp[key]
          })
          temp[keys[keys.length - 1]] = obj[i]
      }
  
      return data
  }
  
  console.log(recoverNest2Plan({a: {b: {c: 1}, d: {f: 2}}}))
  console.log(recoverPlan2Nest({ 'a.b.c': 1, 'a.d.f': 2 }))