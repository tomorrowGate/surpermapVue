# 安装

你可以通过以下两种方式安装 Vue-iClient3D-WebGL。

### npm

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

::: tip 注意
在当前版本中 @supermap/vue-iclient-webgl 已更名为 @supermap/vue-iClient3D-WebGL
:::

使用此方式前请先检查电脑中是否已安装应用程序 [Node.js](https://nodejs.org/zh-cn/)，若未安装，可通过下载 [安装程序](https://nodejs.org/zh-cn/) 来安装。然后在命令行中输入以下命令安装 SuperMap Vue-iClient3D-WebGL：

```
npm install @supermap/vue-iClient3D-WebGL
```

如果您使用了 npm 安装，并使用 webpack 作为构建工具，请继续阅读[快速上手章节](./quick-start.md)。

### CDN

获取文件后，只需要像普通的 JavaScript 库一样用 &lt;script&gt; 标签引入即可。

以下详细介绍如何通过 [在线站点](https://iclient.supermap.io/) 引入 SuperMap Vue-iClient3D-WebGL。

新建一个 HTML 文件，在 &lt;head&gt; 标签中引入如下文件：

- 引入 Vue.js 文件

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
```

- 引入 Cesium 和 CSS 文件

```html
<link href="http://support.supermap.com.cn:8090/webgl/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />
<script type="text/javascript" src="http://support.supermap.com.cn:8090/webgl/Build/Cesium/Cesium.js"></script>
```

- 引入 图标 样式 CSS 文件

```html
<link href="http://support.supermap.com.cn:8090/webglTest/examples/component/css/geoFontNew/iconfont.css" rel="stylesheet">
```

- 引入 SuperMap 配置 JS 和 CSS 文件

```html
<script src="http://support.supermap.com.cn:8090/webgl/examples/js/tooltip.js"></script>
<script src="http://support.supermap.com.cn:8090/webgl/examples/js/config.js"></script>
<script src="http://support.supermap.com.cn:8090/webglTest/examples/js/axios.min.js"></script>
```

- 引入 view-design第三方库 JS 和 CSS 文件

```html
<link rel="stylesheet" href="//unpkg.com/view-design/dist/styles/iview.css">
<script src="//unpkg.com/view-design/dist/iview.min.js"></script>
```

- 引入 Vue-iClient3D-WebGL JS 和 CSS 文件

```html
<script src="http://support.supermap.com.cn:8090/webglTest/examples/component/js/vue-iclient3d-webgl.min.js"></script>
```

#### 示例

通过引入文件方式可以快速使用 Vue-iClient3D-WebGL 写出一个示例，您可以复制下面代码或参考此在线[示例](http://support.supermap.com.cn:8090/webglTest/examples/component/editor.html#vue_measure)。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>vue-iClient3D-WebGL example</title>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>

    <link href="http://support.supermap.com.cn:8090/webgl/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />
    <script type="text/javascript" src="http://support.supermap.com.cn:8090/webgl/Build/Cesium/Cesium.js"></script>
    <link href="http://support.supermap.com.cn:8090/webglTest/examples/component/css/geoFontNew/iconfont.css" rel="stylesheet">

    <script src="http://support.supermap.com.cn:8090/webgl/examples/js/tooltip.js"></script>
    <script src="http://support.supermap.com.cn:8090/webgl/examples/js/config.js"></script>
    <script src="http://support.supermap.com.cn:8090/webglTest/examples/js/axios.min.js"></script>

    <link rel="stylesheet" href="//unpkg.com/view-design/dist/styles/iview.css">
    <script src="//unpkg.com/view-design/dist/iview.min.js"></script>

    <script src="http://support.supermap.com.cn:8090/webglTest/examples/component/js/vue-iclient3d-webgl.min.js"></script>


    <style type="text/css">
        html,
        body,
        #app {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
            color: #eee;
        }
    </style>
</head>
<body>
<div id="app">
    <sm-viewer :scene-url="URL">
        <sm3d-measure></sm3d-measure>
    </sm-viewer>
</div>


<script>
    let vm = new Vue({
        el: '#app',
        data: {
            URL: "http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace"
        }
    });
</script>
</body>
</html>
```
