### watcher-immediate

修改前:
```js
    created () {
        this.fetchData()
    },
    watch: {
        value () {
            this.fetchData()
        }
    }
```
修改后：
```js
    watch: {
        value: {
            handle: 'fetchData',
            immediate: true
        }
    }
```
`immediate: 表示回调将会在侦听开始之后被立即调用`

### 高阶组件

父组件和子组件之间的数据是通过`props`传递，事件是通过`emit`触发
```js
// parent
<child-input :value="value" placeholder="请输入" @input="handleInput" @focus="handleFocus"></child-input>

// child
<template>
    <input :value="value" :placeholder="placeholder" @fucus="$emit('focus', $event)" @input="$emit('input', $event.target.value)"></input>
</template> 
```
**$attrs包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定，并且可以通过 v-bind="$attrs" 传入内部组件——在创建更高层次的组件时非常有用.**
<br>

**$listeners包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。**

```js
<input
    v-bind="$attrs"
    v-on="listeners"
>

computed: {
  listeners() {
    return {
      ...this.$listeners,
      input: event => 
        this.$emit('input', event.target.value)
    }
  }
}
```
>tips
>子组件中的绑定多个相同事件，可多次触发（addEventLinters）, 如child组件，和parant组件同事绑定了@input,可分别触发