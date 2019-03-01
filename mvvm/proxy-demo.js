let data = { price: 5, quantity: 2 };
let target = null;
class Dep {
  constructor() {
    this.subscribers = [];
  }
  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }
  notify() {
    this.subscribers.forEach(sub => sub());
  } 
}
// 前边的代码都没变
let deps = new Map(); // 创建一个Map对象
Object.keys(data).forEach(key => {
  // 为每个属性都设置一个依赖实例 并放入 deps 中
  deps.set(key, new Dep());
});
let data_without_proxy = data; // 保存源对象
data = new Proxy(data_without_proxy, {
  // 重写数据以在中间创建一个代理
  get(obj, key) {
    deps.get(key).depend(); // <-- 依旧为存储target
    return obj[key]; // 返回原始数据
  },
  set(obj, key, newVal) {
    obj[key] = newVal; // 将原始数据设置为新值
    deps.get(key).notify(); // <-- 依旧为重新运行已存储的targets
    return true;
  }
});
// 用来监听具有响应性属性的代码
function watcher(myFunc) {
  target = myFunc;
  target();
  target = null;
}
let total = 0
watcher(() => {
  total = data.price * data.quantity;
});
console.log("total = " + total); 
data.price = 20;
console.log("total = " + total);
data.quantity = 10;
console.log("total = " + total);
deps.set('discount', new Dep())
data['discount'] = 5;
let salePrice = 0;
watcher(() => {
  salePrice = data.price - data.discount;
});
console.log("salePrice = " + salePrice); 
data.discount = 7.5
console.log("salePrice = " + salePrice);