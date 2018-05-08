## Vue中组件的通讯
1. 父子组件用Props通讯
2. 非父子组件用Event Bus通信
3. 通过Vuex状态管理库通信

### 初始化
```js
class EventEmeitter {
    constructor () {
        this._events = this._events || new Map()
    }
}
```
### 监听和触发
触发监听函数我们可以用apply与call两种方法,在少数参数时call的性能更好,多个参数时apply性能更好,当年Node的Event模块就在三个参数以下用call否则用apply,
我们这里为了方便，直接有参数的使用apply，无参数的使用call
```js
class EventEmeitter {
    constructor () {
        this._events = this._events || new Map()
    }
    emit (type, ...args) {
        let handler = this._events.get(type)
        if (args.length > 0) {
            handler.apply(this, args)
        } else {
            handler.call(this)
        }
        return true
    }
    addListener (type, fn) {
        if (!this._events.get(type)) {
            this._events.set(type, fn)
        }
    }
}
```

执行一下
```js
const emitter = new EventEmeitter();

emitter.addListener('arson', man => {
  console.log(`expel ${man}`);
});

emitter.emit('arson', 'low-end'); // expel low-end
```
但是呢有一个问题，多个监听者时只会触发一次

### 改造监听/触发器
主要思想是，多个监听时，将监听器放到一个数组里
```js
class EventEmeitter {
    constructor () {
        this._events = this._events || new Map()
    }
    emit (type, ...args) {
        let handler = this._evnets.get(type)
        if (Array.isArray(handler)) {

        } else {
            if (arg.length > 0) {
                handler.apply(this, args)
            } else {
                handler.call(this)
            }
        }
    }
}
```
