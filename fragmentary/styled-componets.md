# styled-components
styled components是一个React第三方库，作用是可以将样式写成组件的形式，实现在JavaScript上编写Css，解决了原生css所不具备的能力，比如变量、循环、函数等。

Vue对应的第三方库是**vue-styled-components**，虽然styed在Vue的使用体验并没有React好。

因为微信商城首页准备重构，这里的案例以Vue为模板。

安装：
```xml
npm install --save styled-components
```
编辑器Visual Studio Code

安装高亮插件： vscode-styled-components，其他编辑器请自行搜索安装

因为高亮插件只能在js文件夹中识别，vue后缀文件无法识别
所以我们先创建css文件--home.js
```js
// home.js
import styled from 'vue-styled-components'
const StyledTitle = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`
const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
    display: flex;
`
export {StyledTitle, Wrapper}
```
然后在home.vue页面引入,因为vue的template模板是经过vue-loader解析，需要让vue认识styled.js文件, 在components属性内引入

```js
// home.vue
import {StyledTitle, Wrapper} from './home'
  export default {
    name: 'home',
    data () {
        ...
    },
    mounted () {
        ...
    },
    components: {
      Wrapper,
      StyledTitle,
    }
  }
```
```html
// template部分
<template>
    ...
    <Wrapper>
      <StyledTitle>Hello World, this is my first styled component!</StyledTitle>
    </Wrapper>
</template>
```
实际展示效果

![效果](https://s1.ax1x.com/2018/09/05/ipogWF.png)


## 动态传参
需要传值的css,需要像Vue组件一样，配置props，如下面的btnProps, 然后添加多一个样式，StyledButton
```js
// home.js
...
const btnProps = { primary: String }
const StyledButton = styled('button', btnProps)`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    background: ${props => props.primary ? 'palevioletred' : 'white'};
    color: ${props => console.log(props.primary)};
`

export {StyledTitle, Wrapper, StyledButton}
```
vue文件内引入,并添加prop
```js
import {StyledTitle, Wrapper, StyledButton} from './home'
  export default {
    name: 'home',
    props: ['primary'],
    data () {
        ...
        btnColor: 'red'
    },
    mounted () {
        ...
    },
    components: {
      Wrapper,
      StyledTitle,
      StyledButton
    }
  }
```
模板html
```html
<template>
    ...
    <Wrapper>
      <StyledTitle>Hello World, this is my first styled component!</StyledTitle>
      <StyledButton :primary="btnColor" />
    </Wrapper>
</template>
```
效果
![img](https://s1.ax1x.com/2018/09/05/ipbj9f.png)
可以看到css color值是动态传进去的

以上是基本的用法。

详细请看

[vue-styled-components](https://github.com/styled-components/vue-styled-components)

[styled-components](https://www.styled-components.com/docs)

