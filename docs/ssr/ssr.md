*使用vs code等软件预览文件可获得更佳的体验效果*
# 目录
```yaml
.
├── build # 构建
│   ├── setup-dev-server.js # 本地服务
│   ├── utils.js
│   ├── vue-loader.config.js
│   ├── webpack.base.config.js
│   ├── webpack.client.config.js # 前端配置
│   └── webpack.server.config.js # 后端配置
├── config # 配置
│   ├── baseUrl.js # 不同环境中的接口URL
│   ├── index.js # 构建配置
├── index.html # 纯前端开发模板
├── index_prod.html # 纯前端生产模板
├── server.js # node入口
└── src # 开发目录
    ├── api
    │   ├── create-api-client.js # client axios配置
    │   ├── create-api-server.js # server axios配置
    │   └── index.js # 数据请求API
    ├── app.js # 整合router,filters,vuex 的通用入口文件
    ├── App.vue # 根 vue 组件
    ├── components 
    │   ├── load.vue
    │   └── msg.vue
    ├── entry-client.js  # 客户端入口
    ├── entry-server.js # 服务端入口
    ├── index.template.html # 服务端模板
    ├── router
    │   └── index.js
    ├── scss
    ├── views
    │   ├── home.vue
    └── vuex
        ├── home-list.js
        ├── index.js

```

package.json scripts
```json
  {
    "scripts": {
        "dev": "node server",
        "start": "cross-env NODE_ENV=production PORT=8086 pm2 start server.js --name=mallSsr",
        "build": "rimraf dist && npm run build:client && npm run build:server",
        "build:client": "cross-env NODE_ENV=production webpack --config build/webpack.client.config.js --progress --hide-modules",
        "build:server": "cross-env NODE_ENV=production webpack --config build/webpack.server.config.js --progress --hide-modules"
    },
  }  
```


开发环境执行 `npm run dev`, 即server.js

部分代码如下：
```js
...
// lru算法式缓存
// 在固定的缓存空间下，把最近最少使用的数据移除，让给最新读取的数据。
// 算法假设最常读取的数据一般也是访问次数最多的，尽力保留这部分数据可以提高cache的命中
const LRU = require('lru-cache')
...
// 压缩响应体
const compression = require('compression')
// 微缓存
const microcache = require('route-cache')
// 核心功能
const { createBundleRenderer } = require('vue-server-renderer')

const app = express()

// 创建渲染器，生成虚拟DOM
function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    ...
  }))
}

let renderer
let readyPromise
// 服务器模板页面
const templatePath = resolve('./src/index.template.html')
if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8')
  // 生成环境，读取打包好的json文件创建渲染器
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  // 可选配置，标记(preload/prefetch)资源的在客户端中的加载顺序
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  // 开发环境，设置带有热更新的本地服务器，并在文件更改时刷新渲染器
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    // 基于热更新，回调生成最新的bundle渲染器
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

// 设置静态文件缓存时间
const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

// 压缩阈值
app.use(compression({ threshold: 0 }))
// 依次装载一系列Express中间件，用来处理静态资源，数据压缩等
...

// todo
app.use(microcache.cacheSeconds(1, req => {
  return useMicroCache && req.originalUrl
}))

function render (req, res) {
  res.setHeader("Content-Type", "text/html")

  const handleError = err => {
    ...
  }
  // 设置请求的url
  const context = {
    title: '即有商城',
    url: req.url
  }

  // 为渲染器绑定的server bundle（即entry-server.js）设置入参context,对应src/entry-server.js，并输出html
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
  })
}


app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

```

开发环境下执行:
1. 调用`setup-dev-server.js`，根据`webpack.client.config、webpack.server.config`打包到内存中，并从回调中返回`bundle、clientManifest、template`
2. `createRenderer`接受上面的参数创建渲染器
3. 加载express的中间件，例如处理静态资源、数据压缩，设置缓存等
4. 等待客户端请求，接受客户端请求，匹配路由，生成html，回传给客户端

> Tips
>1. 学习[preload/prefetch](https://css-tricks.com/prefetching-preloading-prebrowsing/)
>1. 学习[微缓存概念](https://www.nginx.com/blog/benefits-of-microcaching-nginx/)
>1. 学习[组件缓存](https://ssr.vuejs.org/zh/caching.html)

打包热更新代码：
`build/setup-dev-server.js`
```js
...
// 读取内存数据
const MFS = require('memory-fs')
...
//以fs(形参)的方式读取file
const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {}
}

module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle
  let template
  let clientManifest

  let ready
  const readyPromise = new Promise(r => { ready = r })
  // 触发server.js中的readyPromise.then\最新的bundle渲染器
  const update = () => {
    if (bundle && clientManifest) {
      ready()
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }

  // 从磁盘中读取模板并实施监听
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template updated.')
    update()
  })

  // 加入hot middleware
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  // dev middleware
  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  })
  app.use(devMiddleware)
  // 在client完成编译后，获取devMiddleware的fileSystem
  // 读取内存中的bundle 并通过update回调更新server.js中的bundle
  clientCompiler.plugin('done', stats => {
    ...  
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ))
    update()
  })

  // 挂载hot middleware
  app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))

  // server renderer
  const serverCompiler = webpack(serverConfig)
  // 获取基于memory-fs创建的内存文件系统对象
  const mfs = new MFS()
  // 自定义文件读写方式，内存中读取
  serverCompiler.outputFileSystem = mfs
  // 监听、更新 server renderer
  serverCompiler.watch({}, (err, stats) => {
    ...
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })

  return readyPromise
}

```
执行如下：
1. 通过webpack打包`webpack.client.config、 webpack.server.config`，加入各种文件监听
2. `chokidar`监听模板文件`(src/index.template.html)`,数据更新时触发`update`函数
3. `webpack-hot-middleware`监听`webpack.client.config`的文件，数据更新时触发`update`函数
4. `watch({})`监听`webpack.server.config`的文件，数据更新时触发`update`函数

</br>

`build/webpack.base.config.js`  
```js
...
module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: utils.setPublicPath(),
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      ...
    }
  },
  module: {
    // N多加载器
    rules: [
      ...
    ]
  },
  // 性能提示
  performance: {
    maxEntrypointSize: 300000,
    ...
  },
  plugins: isProd
    ? [
        //压缩JS 提取css
        ...
      ]
    : [
        new FriendlyErrorsPlugin()
      ]
}

```

`build/webpack.client.config.js`
```js
...

const config = merge(base, {
  // 配置编译的入口文件（客户端）
  entry: {
    app: './src/entry-client.js'
  },
  // 在alias设置客户端数据请求API为create-api-client.js模块
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  // 客户端资源输出
  output: {
    ...
  },
  module: {
    // 为独立的css文件设置加载器
    rules: utils.styleLoaders({
      ...
    })
  },
  plugins: [
    // 设置环境变量
    new webpack.DefinePlugin({
      ...
    }),

    // 压缩CSS
    new OptimizeCSSPlugin({
     ...
    }),

    // 纯客户端模板
    new HtmlWebpackPlugin({
      ...
    }),

    // 设置打包时公共模块的提取规则
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          /node_modules/.test(module.context) &&
          !/\.css$/.test(module.request)
        )
      }
    }),
    // 因为 webpack 在编译打包时都会生成一个 webpack runtime 代码，因为 wepack 允许设置一个未指定的name，
    // 来独立提取 runtime 代码,从而避免每次编译都会导致 vendor chunk hash 值变更
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV !== 'development') {
  config.plugins.push(
    // 自动生成 service worker
    new SWPrecachePlugin({
      cacheId: 'vue-hn',
      filename: 'service-worker.js',
      minify: true,
     ...
    })
  )
}

module.exports = config

```
`bulid/webpack.server.config.js`
```js
...
module.exports = merge(base, {
  // 指定生成后的运行环境在node
  target: 'node',
  // 设置代码调试map
  devtool: '#source-map',
  // 配置编译的入口文件
  entry: './src/entry-server.js',
  // 设置输出文件名，并设置模块导出为commonjs2类型
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  // 在alias设置好服务端数据请求API为create-api-server.js模块
  resolve: {
    alias: {
      'create-api': './create-api-server.js'
    }
  },
  // 设置不打包规则，node下的require('path')...这些就不打包了
  externals: nodeExternals({
    // 排除css
    whitelist: /\.css$/
  }),
  plugins: [
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    // 设置VueSSRServerPlugin插件
    new VueSSRServerPlugin()
  ]
})

```
**以上是`server`到`setup-dev-server`的执行流程**

当服务器接受到请求后，会调用由`createRenderer`生成的`renderer.renderToString`，`renderToString`内部会调用`entry-server.js`
```js
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
```
`context`被传入到`entry-server.js`中

<br>

`entry-server.js`
```js
import { createApp } from './app'

const isDev = process.env.NODE_ENV === 'development'

export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    // 创建vue router store 三个实例
    const { app, router, store } = createApp()

    const { url } = context
    // 解析路由，当url是/，fullPath将是/home
    const { fullPath } = router.resolve(url).route
    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    router.push(url)

    router.onReady(() => {
      // 获取路由下的components
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // 使用Promise.all执行匹配到的Component的asyncData方法，即预取数据
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute,
        app
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        // 把vuex的state设置到传入的context.initialState上
        context.state = store.state
        // 返回Vue实例app,便它可以渲染
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
```
执行如下：
1. 接收一个参数`context`,该参数从`server.js`传入,因为路由处理是异步的，所以返回一个Promise
2. 创建核心的三大实例，`vue、vue-router、vuex`
3. 根据`context.url`切换路由
4. 等待路由解析完毕，获取当前路由下的所有组件，并执行所有`asyncData`方法，`asyncData`的作用是提前获取后台接口数据，如商品列表，将获取到的数据保存到`vuex`中
5. 将`vuex`中的数据挂载到`context.initialState`,即客户端中的`window.__INITIAL_STATE__`,避免客户端重复获取数据，保持服务器与客户端数据同步

>tips
>1. 因为`node`是一个长期运行的进程，当代码运行时，将长期保存在内存中,每次取值都会从内存中获取，所以要避免使用单实例，即**每个请求进来，需要返回一个新的vue实例**<br>
>同样的规则也适用于router、store。你不应该直接从模块导出并将其导入到应用程序中，而是需要在 createApp 中创建一个新的实例，并从根 Vue 实例注入<br>
>参考`app.js`，
>```js
>export function createApp () {
>  // 创建 router 和 store 实例
>  const store = createStore()
>  const router = createRouter()
>  // 同步路由状态(route state)到 store
>  sync(store, router)
>  // 创建应用程序实例，将router和store注入
>  const app = new Vue({
>    router,
>    store,
>    render: h => h(App)
>  })
>  //每次都返回新的 app, router 和 store
>  return { app, router, store }
>}
>```
上面提到的`asyncData`,服务器根据url匹配到对应的路由，会执行对应的`asyncData`方法
如/home组件
<br>
`src/views/home`
```html
<template>
  <div class="home">
    ...
    <router-link class="product-lists" :to="'/details?skuCode='+ value.skuCode" v-for="(value, index) in currentList" :key="index">
        <div class="lists-img">
          <img :src="listsImgHost + folder + value.src" alt="">
          <div class="dafy-free-tips" v-if="value.isPromotion">免息</div>
        </div>
        <div class="description">
          <div class="description-title">{{value.name}}</div>
          <div class="price"><span>售价：￥{{value.salePrice | removeComma}}</span></div>
        </div>
      </router-link>
  </div>
</template>
```
```js
export default {
    name: 'home',
    data () {
      return {
        ...
        // 当前页面展示,从vuex中获取
        currentList: this.$store.state.homeList.productLists.phone,
      }
    },
    asyncData ({app, store}) {
      // 触发vuex中的action(异步)事件，获取商品列表，返回promise  
      return store.dispatch('homeList/getGoodsList', {
        channel: 'WX_OA',
        orderSort: 'salesVolume',
        pageNum: 1,
        pageSize: 10,
        code: '20171119'
      }).then(data => {
        // 将商品列表保存到vuex中  
        store.commit('homeList/setProductLists', {
          key: 'phone',
          value: data.data.data.resultList
        })
        return true
      })
    },
    mounted () {
      ...
    }
  }
```
最终Vue渲染器会自动把这部分内容插入index.template.html中，替换对应的`<!--vue-ssr-outlet-->`，server.js将整个html写入http响应体，浏览器就得到了整个html页面，整个首次访问过程完成。

>tpis ssr渲染需要注意
>1. axios 的拦截器在 node 端也会导致内存泄漏, 因为之前版本是 SPA 版的, axios 配置也是针对 SPA 的配置, 里面有用到拦截器, 并且有大量的逻辑处理在里面, 包括加载进度, 错误处理等等, 这些逻辑在 node 端是没有任何意义的, 那么我们就需要对 node 端写个专门的 axios 配置文件
>2. 缓存主要包括两个部分:<br>
>服务端的 api 数据缓存<br>
>组件的缓存<br>
>*  api 数据缓存
>配置服务端axios<br>src/api/create-api-server.js
>```js
>export function createAPI() {
>  let api
>  if (process.__API__) {
>    api = process.__API__
>  } else {
>    api = process.__API__ = $http.create({
>      baseURL: baseUrl,
>      headers: {
>        platform: 'weChatMall',
>        channel: 'WX_OA'
>      }
>    })
>    api.onServer = true
>    // 注入缓存
>    api.cached = LRU({
>      max: 1000,
>      maxAge: 1000 * 60 * 15
>    })
>  }
>  return api
>}
>```
>使用缓存<br>src/api/index.js
>```js
>export function getGoodsList (data) {
>  const cached = api.cached
>  const key = 'getGoodsList'
>  if (cached && cached.has(key)) {
>    console.log('api cached: true')
>    return Promise.resolve(api.cached.get(key))
>  }
>  return api.post('/v1/wxoa/goods/init', data).then(res => {
>    if (cached && res.data.result === 'success') {
>      cached.set(key, res)
>    }
>    return res
>  })
>}
>```
>**标记是不是要缓存的方法有很多, 并不是所有接口都要走缓存,这只是举个例子**
>
>* 组件的缓存<br>
>首先先安装lru-cache<br>
>然后在server.js里createBundleRenderer的时候带上缓存的配置<br>
>```js
>require('vue-server-renderer').createBundleRenderer(bundle, {
>    cache: require('lru-cache')({
>        max: 1000, // 缓存最大数量
>        maxAge: 1000 * 60 * 15, // 缓存时间 15分钟
>    })
>})
>```
>在组件里申明 key
>```js
>serverCacheKey: () => {
>    return `abc123`
>}
>```
>组件缓存的相关用法, 请参考官方文档:
>[点击我看看](https://ssr.vuejs.org/zh/caching.html)<br>
>一般情况下, 我们不要给容器型组件, 只给展示型组件加缓存, 如一个组件是静态组件, 如组件的数据是通过 props 传进去的
>
>3. 配置 nginx
>需要做两件事情
>* 让静态文件直接走 nginx, 不再经过 nodejs
>* 当直出报错挂掉之后，会让请求自动转发到静态资源，让相对稳定的静态资源接受用户的请求，以保证业务不受干扰
<br>
>**注意实际使用时，纯客户端页面（CDN）和node不应放在不同的服务器**
>```nginx
>        location /weChat-mall {  # 纯客户端页面
>            index index.html;
>            alias /var/www/html/weChat-mall-ssr/dist;
>            add_header Cache-Control no-cache;
>            try_files $uri $uri/ /weChat-mall/index.html;
>        }
>
>        location ^~ /weChat-mall-ssr/static { # 静态文件
>            alias /var/www/html/weChat-mall-ssr/dist/static;
>            expires 30d;
>        }
>
>        location /weChat-mall-ssr/ { # 服务端node配置
>            proxy_pass http://127.0.0.1:8086/;
>            proxy_intercept_errors on; # 拦截状态码
>            error_page 403 404 408 500 501 502 503 504 =200 @static_page;
>            # 将状态码改为200，,并指向新规则处理
>        }
>
>        location @static_page {
>            rewrite /weChat-mall-ssr/(.*)$ /weChat-mall/$1 redirect;
>        }
>```


接下来是客户端接收到服务器发来的html后，继续接管页面管理（MVVM）
纯客户端执行的JS文件是`entry-client.js`
```js
import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import fastClick from 'fastclick'
import Check from "./utils/check"

fastClick.attach(document.body)

// beforeRouteUpdate,当路由的params改变时触发
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

new Check()

const { app, router, store } = createApp()

// 同步服务器state到store中
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.beforeEach((to, from, next) => {
  app && app.$store.commit('loadShow')
  next()
})
router.afterEach(() => {
  app && app.$store.commit('loadHide')
})

// 路由准备就绪
router.onReady(() => {
  // 挂载异步路由hook
  router.beforeResolve((to, from, next) => {
    // 获取组件
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    // 对比组件，找出两个匹配列表的差异组件
    // [a, b]
    // [a, b, c, d]
    // => [c, d]
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to, app })))
      .then(() => {
        next()
      })
      .catch(next)
  })

  // 纯静态页面时/weChat-mall/，与router base的/weChat-mall-ssr/不一致,强制纠正为/weChat-mall-ssr/
  let url = router.currentRoute.fullPath
  if (!~url.indexOf(router.options.base)) {
    router.push(url.replace(/^\/[\s\S]*\//, '/'))
  }
  app.$mount('#app')
})

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}

```
服务端获取数据速度<br>
![速度](https://s1.ax1x.com/2018/04/12/CAXDFH.png)

**体验效果**<br>
SSR:<br>
![ssr](https://s1.ax1x.com/2018/04/12/CAXrYd.png)
<br>
纯client<br>
![client](https://s1.ax1x.com/2018/04/12/CAXsfA.png)

[体验链接](http://idcwxtest.dafysz.cn/weChat-mall-ssr/home)