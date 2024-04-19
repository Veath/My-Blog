## 深克隆
1. 简单粗暴方法-`const newObj = JSON.parse(JSON.stringify(oldObj))`
```js
const oldObj = {
    a: 1,
    b: ['e', 'f', 'g'],
    c: {h: {i: 2}}
}

const newObj = JSON.parse(JSON.stringify(oldObj))
console.log(newObj.c.h, oldObj.c.h) // {i: 2} {i: 2}
console.log(newObj.c.h === oldObj.c.h) // false
newObj.c.h.i = 'change'
console.log(newObj.c.h, oldObj.c.h) // {i: 'change'} {i: 2}
```
这个方法有部分场景不可满足的
>1. 无法实现对函数、RegExp等特殊对象克隆
>2. 会抛弃对象的constructor,所有的构造函数会指向Object
>3. 对象循环引用会保存

```js
// 构造函数
function person(pname) {
  this.name = pname;
}

const Messi = new person('Messi');

// 函数
function say() {
  console.log('hi');
};

const oldObj = {
  a: say,
  b: new Array(1),
  c: new RegExp('ab+c', 'i'),
  d: Messi
};

const newObj = JSON.parse(JSON.stringify(oldObj));

// 无法复制函数
console.log(newObj.a, oldObj.a); // undefined [Function: say]
// 稀疏数组复制错误
console.log(newObj.b[0], oldObj.b[0]); // null undefined
// 无法复制正则对象
console.log(newObj.c, oldObj.c); // {} /ab+c/i
// 构造函数指向错误
console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: Object] [Function: person]
```

针对上面的问题，实现一个深拷贝
```js
// 类型判断
const isType = (obj, type) => {
    if (typeof obj !== 'object') return false
    const typeString = Object.prototype.toString.call(obj)
    let flag
    switch (type) {
        case 'Array':
            flag = typeString === '[object Array]'
            break
        case 'Date':
            flag = typeString === '[object Date]'
            break
        case 'RegExp':
            flag = typeString === '[object RegExp]'
            break
        default:
            flag = false
    }
    return flag
}

// 正则flags属性
const getRegExp = re => {
    let flag = ''
    if (re.global) flags += 'g'
    if (re.ignoreCase) flags += 'i'
    if (re.multiline) flags += 'm'
    return flag
}

// 重点拷贝函数
const clone = parent => {
    const parents = []
    const children = []

    const _clone = parent => {
        if (!parent) return null
        if (typeof parent !== 'object') return parent

        let child
        let proto

        if (isType(parent, 'Array')) {
            child = []
        } else if (isType(parent, 'RegExp')) {
            child = new RegExp(parent.source, getRegExp(parent))
            if (parent.lastIndex) child.lastIndex = parent.lastIndex
        } else if (isType(parent, 'Date')) {
            child = new Date(parent.getTime())
        } else {
            proto = Object.getPrototypeOf(parent)
            child = Object.create(proto)
        }

        const index = parents.indexOf(parent)
        if (index !== -1) {
            return children[index]
        }
        parents.push(parent)
        children.push(child)
        for (let i in parent) {
            child[i] = _clone(parent[i])
        }
        return child
    }
    return _clone(parent)
}

function person(pname) {
  this.name = pname;
}

const Messi = new person('Messi');

function say() {
  console.log('hi');
}

const oldObj = {
  a: say,
  c: new RegExp('ab+c', 'i'),
  d: Messi,
};

oldObj.b = oldObj;


const newObj = clone(oldObj);
console.log(newObj.a, oldObj.a); // [Function: say] [Function: say]
console.log(newObj.b, oldObj.b); // { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] } { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] }
console.log(newObj.c, oldObj.c); // /ab+c/i /ab+c/i
console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: person] [Function: person]
```
