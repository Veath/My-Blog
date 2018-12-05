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
主要思想是，多个监听时，将监听器放到一个数组里,并添加移除监听的功能
```js
class EventEmeitter {
    constructor () {
        this._events = this._events || new Map()
    }
    emit (type, ...args) {
        let handler = this._evnets.get(type)
        if (Array.isArray(handler)) {
            for (let i = 0; i < handler.length; i++) {
                if (args.length > 0) {
                    handler[i].apply(this, args)
                } else {
                    handler[i].call(this)
                }
            }
        } else {
            if (arg.length > 0) {
                handler.apply(this, args)
            } else {
                handler.call(this)
            }
        }
    }
    addListener (type, fn) {
        const handler = this._events.get(type)
        if (!handler) {
            this._events.set(type, fn)
        } else if (handler && typeof handler === 'function') {
            this._evnets.set(type, [handler, fn])
        } else {
            handler.push(fn)
        }
    },
    removeListenner (type, fn) {
        const handler = this._events.get(type)

        if (handler && typeof handler === 'function') {
            this._events.delete(type, fn)
        } else {
            let postion
            for (let i = 0; i < handler.length; i++) {
                if (handler[i] === fn) {
                    postion = i
                } else {
                    postion = -1
                }
            }

            if (postion !== -1) {
                handler.splice(position, 1)
                if (handler.length === 1) this._events.set(type, handler[0])
            } else {
                return this
            }
        }
    }
}
```
以上是event bus的主要思想，但仍然有不住的地方
1. 我们没有对参数进行充分的判断,没有完善的报错机制.
2. 模拟不够充分: 除了removeAllListeners这些方法没有实现以外,例如监听时间后会触发newListener事件

网上有很多轮子已经有完整的特性，如：[Event库](https://github.com/Gozala/events/blob/master/events.js)
