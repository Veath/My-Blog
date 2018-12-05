class Vue {
    constructor (options) {
        this._init(options)
    }
    
    _init (options) {
        this.$options = options
        this.$el = document.querySelector(options.el)
        this.$data = options.data
        this.$methods = options.methods
    
        this._binding = {}
        this._obverse(this.$data)
        this._complie(this.$el)
    }

    _obverse (obj) {
        Object.keys(obj).forEach((key) => {
          if (obj.hasOwnProperty(key)) {
            this._binding[key] = {                                                                                                                                                          
              _directives: []
            };
            console.log(this._binding[key])
            var value = obj[key];
            if (typeof value === 'object') {
              _this._obverse(value);
            }
            var binding = this._binding[key];
            Object.defineProperty(this.$data, key, {
              enumerable: true,
              configurable: true,
              get: function () {
                console.log(`${key}获取${value}`);
                return value;
              },
              set: function (newVal) {
                console.log(`${key}更新${newVal}`);
                if (value !== newVal) {
                  value = newVal;
                  binding._directives.forEach(function (item) {
                    item.update();
                  })
                }
              }
            })
          }
        })
    }

    _complie (root) {
        let nodes = root.children
        let _this = this
        for (let i = 0; i < nodes.length; i++) {
          let node = nodes[i];
          if (node.children.length) {
            this._complie(node)
          }
    
          if (node.hasAttribute('v-click')) {
            node.onclick = (() => {
              var attrVal = nodes[i].getAttribute('v-click');
              return _this.$methods[attrVal].bind(_this.$data);
            })()
          }
    
          if (node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {
            node.addEventListener('input', ((key) => {
              var attrVal = node.getAttribute('v-model')
              this._binding[attrVal]._directives.push(new Watcher(
                'input',
                node,
                _this,
                attrVal,
                'value'
              ))
    
              return function() {
                _this.$data[attrVal] =  nodes[key].value;
              }
            })(i))
          } 
    
          if (node.hasAttribute('v-bind')) {
            var attrVal = node.getAttribute('v-bind')
            this._binding[attrVal]._directives.push(new Watcher(
              'text',
              node,
              _this,
              attrVal,
              'innerHTML'
            ))
          }
        }
    }
}

class Watcher {
    constructor (name, el, vm, exp, attr) {
        this.name = name
        this.el = el
        this.vm = vm
        this.exp = exp
        this.attr = attr
    
        this.update()
    }

    update () {
        this.el[this.attr] = this.vm.$data[this.exp] 
    }
}