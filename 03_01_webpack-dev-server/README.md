# 开发工具
## source map
> *当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而**其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js**。这通常没有太多帮助，因为你可能需要准确地知道错误来自于哪个源文件。**为了更容易地追踪错误和警告**，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你。*
* **webpack.config.js**中：
```javascript
  const path = require("path");
  const htmlWebpackPlugin = require("html-webpack-plugin");
  const cleanWebpackPlugin = require("clean-webpack-plugin");

  module.exports = {
    entry: {
      app: "./src/index.js",
      print: "./src/print.js"
    },
    mode: "development",
+   devtool: "inline-source-map", // 追踪到源文件
    plugins: [
      new htmlWebpackPlugin({
        title: "Output-Management"
      }),
      new cleanWebpackPlugin(["build"])
    ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "build")
    }
  }
```

## webpack-dev-server
> *创建一个服务器，并实现**热更新***
``` shell
$ npm i webpack-dev-server -D
```
* **webpack.config.js**中：
```javascript
  const path = require("path");
  const htmlWebpackPlugin = require("html-webpack-plugin");
  const cleanWebpackPlugin = require("clean-webpack-plugin");

  module.exports = {
    entry: {
      app: "./src/index.js",
      print: "./src/print.js"
    },
    mode: "development",devtool: "inline-source-map", 
+   devServer: {
+     contentBase: "./build"
+   }, // 启动服务器：webpack-dev-server --open
    plugins: [
      new htmlWebpackPlugin({
        title: "Output-Management"
      }),
      new cleanWebpackPlugin(["build"])
    ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "build")
    }
  }
```

## 热模块替换
> *我们使用 **WebpackDevServer** 创建了项目的热更新服务器，页面会随着你代码的改变而实时刷新，然而，当**我们不满足于它更新页面的速度**时，热模块替换将能更好的满足我们的需求。*
---
> 与 **WebpackDevServer** 所实现的实时加载不同的是，**热模块替换可以仅仅只更改改变的模块而不需要刷新整个页面**。
* **webpack.config.js** 中：
```JavaScript
  const path = require("path");
  const htmlWebpackPlugin = require("html-webpack-plugin");
  const cleanWebpackPlugin = require("clean-webpack-plugin");
+ const webpack = require("webpack");

  module.exports = {
    entry: {
      app: "./src/index.js",
      // print: "./src/print.js"
    },
    mode: "development",
    devtool: "inline-source-map", // 追踪到源文件
    devServer: {
      contentBase: "./build",
+     hot: true
    },
    plugins: [
      new htmlWebpackPlugin({
        title: "Output-Management"
      }),
      new cleanWebpackPlugin(["build"]),

+     // 热模块替换需要用到webpack内置的插件：
+     new webpack.NamedModulesPlugin(),
+     new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "build")
    }
  }
```
* **index.js** 中：
```JavaScript
  import _ from "lodash";
  import printMe from "./print";

  function createDom () {
    let div = document. createElement("div");
    div.innerText = _.join(["management"," ", "output"], "");
    let btn = document.createElement("button");
    btn.innerHTML = "click me";
    div.appendChild(btn);
    btn.addEventListener("click", printMe);
    return div;
  }

  document.body.appendChild(createDom());

+ if(module.hot) {
+   module.hot.accept("./print.js", () => {
+     console.log("Accepting the updated printMe module!")
+     printMe();
+   })
+ }
```