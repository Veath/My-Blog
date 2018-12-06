### 图片遇上css

#### 1、img 标签 + display:none
```html
    <img src="https://www.google.com/logos/doodles/2018/president-george-h-w-bush-5637895883849728-l.png"  style="display:none" />
```
img标签不管是否设置diplay:none，都会加载资源

### 2、background-image + display:none
**两种代码结构：**
```html
    <div>
        <div style="background: url(https://www.google.com/logos/doodles/2018/president-george-h-w-bush-5637895883849728-l.png)"></div>
    </div>
    <!-- 或者 -->
    <div style="background: url(https://www.google.com/logos/doodles/2018/president-george-h-w-bush-5637895883849728-l.png)"></div>
```

1. 在Firefox浏览器下，display:none的background-image图片不加载，包括父元素display:none也是如此

1. 在Chrome和Safari浏览器，则根据父元素是否是否为none来影响图片加载情况，父元素带有display:none，图片不加载。
父元素不带有display:none,而自身有背景图元素带的话，那也照样加载

1. 在IE浏览器下，无论怎么搞都会请求图片资源，就是这么任性
