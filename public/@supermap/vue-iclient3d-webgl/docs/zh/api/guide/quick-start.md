# 快速上手

本节将介绍如何在项目中使用。

### 使用之前

高效的开发，离不开基础工程的搭建。在开始使用 Vue-iClient3D-WebGL 之前，有必要先了解以下基础知识，我们也假设您已经写过 Vue，并掌握了下面的内容。

  - [Vue 组件](https://cn.vuejs.org/v2/guide/components.html)
  - [单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)

以下概念贯穿 Vue-iClient3D-WebGL 前后，建议开发者花点时间来了解。

  - prop 传递数据
  - slot 内容分发
  - events $emit @click 事件

### 引入 Vue-iClient3D-WebGL

在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import App from './App.vue';

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

import axios from 'axios'
window.axios = axios //挂载到window上

import echarts from 'echarts'
window.echarts = echarts //挂载到window上


import VueiClient from '@supermap/vue-iClient3D-WebGL';
Vue.use(VueiClient);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

在 index.html 中写入以下内容：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>vue-iclient3d-webgl</title>

  <!--    组件css-->
  <link href="./static/css/geoFont/iconfont.css" rel="stylesheet">

  <!--    Cesium+vue-->
  <link href="./static/Cesium/Widgets/widgets.css" rel="stylesheet">
  <script src="./static/Cesium/Cesium.js"></script>

  <!--    supermap-->
  <script src="./static/js/config.js"></script>
  <script src="./static/js/tooltip.js"></script>

</head>

<body>
  <div id="app"></div>
  <!--    vue-iclient3d-webgl-->
  <script src="./dist/vue-iclient3d-webgl.min.js"></script>
</body>

</html>

```


以上代码便完成了 Vue-iClient3D-WebGL 的引入。
