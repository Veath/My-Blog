## 已更新1.1，---》./src/mvvm-1.1.js
理解MVVM，代码可能跑不起来，但有利于理解MVVM
#### **打造MVVM**

```js
function Mvvm (options = {}) {
    this.$options = options
    let data = this._data = options.data
    iniComputed.call(this)
    // 数据劫持
    observe(data)

    //数据代理
    //mvvm_data.a.b ==> mvvm.a.b
    for (let key in data) {
        Object.defineProperty(this, key, {
            configurable: true,
            get () {
                return this._data[key]
            },
            set (newVal) {
                this._data[key] = newVal
            }
        })
    }

    // 数据编译
    new Compile(options.el, this)
    options.mounted.call(this)
}

function iniComputed () {
    let vm = this
    let computed = this.$options.computed
    Object.key(computed).forEach((key) => {
        Object.defineProperty(vm, key, {
            get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
            set () {}
        })
    })
}

function Observe (data) {
    let dep = new Dep()
    for (let key in data) {
        let val = data[key]
        // 递归数据劫持
        observe(val)
        Object.defineProperty(data, key, {
            configuarble: true,
            get () {
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set (newVal) {
                if (val === newVal) return
                val = newVal
                // 新值需要再次劫持
                observe(newVal)
                dep.notify()
            }
        }) 
    }
}

function observe (data) {
    if (!data || typeof data !== 'object') return
    return new Observe(data)
}

function Compile(el, vm) {
    vm.$el = document.querySelector(el)
    let fragment = document.createDocumentFragment()

    whilt (child = vm.$el.firstChild) {
        fragment.appendChild(child)
    }

    function replace(frag) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent
            let reg = /\{\{(.*?)\}\}/g

            // 文本
            if (node.nodeType === 3 && reg.test(txt)) {
                function replaceTxt () {
                    node.textContent = txt.replace(reg, (matched, placeholder) => {
                        new Watcher(vm, placeholder, replaceTxt)
                        return placeholder.split('.').reduce((val, key) => {
                            return val[key]
                        }, vm)
                    })
                }

                replaceTxt()
                // 元素
            } else if (node.nodeType === 1) {
                let nodeAttr = node.attribute
                Array.from(nodeAttr).forEach(arrt => {
                    let name = attr.name
                    let exp = attr.value
                    if (name.includes('v-')) {
                        node.value = vm[exp]
                    }
                    new Watcher(vm, exp, function (newVal) {
                        node.value = newVal
                    })
                    node.addEventListener('input', (e) => {
                        let newVal = e.target.value
                        vm[exp] = newVal
                    })
                })
            }

            if (node.childNodes && node.childNodes.length) {
                replace(node)
            }
        })
    }
    replace(fragment)
    vm.$el.appendChild(fragment)
}

// 发布订阅
function Dep () {
    this.subs = []
}
Dep.prototype = {
    addSub (sub) {
        this.subs.push(sub)
    },
    notify () {
        this.subs.forEach(sub => sub.update())
    }
}

function Watcher (vm, exp, fn) {
    this.fn = fn
    this.vm = vm
    this.exp = exp
    Dep.target = this
    let arr = exp.split('.')
    let val = vm
    arr.forEach((key) => {
        val = val[key]
    })
    Dep.target = null
}
Watcher.prototype.update = function () {
    let arr = this.exp.split('.')
    let val = this.vm
    arr.forEach(key => {
        val = val[key]
    })
    this.fn(val)
}
```