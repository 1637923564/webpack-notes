# webpack 开发中间件
## WebpackDevMiddleware
> webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 webpack-dev-server 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求。接下来是一个 webpack-dev-middleware 配合 express server 的示例。
* 安装**webpack-dev-middleware**和**express**
```shell
$ npm i webpack-dev-middleware express -D
```

* 根目录下新建一个**server.js**：
```javascript
  const express = require("express");
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");

  const config = require("./webpack.config.js");

  const app = express();
  const compiler = webpack(config);

  app.use(webpackDevMiddleware({
    publicPath: config.plugins.publicPath
  }))

  app.listen(3000, ()=> console.log(">>> http://localhost:3000"));
```
```shell
$ node server.js
```

## WebpackHotMiddleware
> *我们使用 **WebpackDevServer**创建了项目的热更新服务器，页面会随着你代码的改变而实时刷新，但这仍然是不够的，当我们不满足于它更新页面的速度时，热模块替换将能更好的满足我们的需求，这里我们使用**WebpackHotMiddleware**来实现（这**必须基于WebpackDevMiddleware**）*
```shell
$ npm i webpack-hot-middleware
```
* *server.js* 中：
```javascript
  const express = require("express");
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
+ const webpackHotMiddleware = require("webpack-hot-middleware");

  const config = require("./webpack.config.js");

  const app = express();
  const compiler = webpack(config);

  app.use(webpackDevMiddleware({
    publicPath: config.plugins.publicPath
  }));
+ app.use(webpackHotMiddleware({
+   heartbeat: 2000
+ }))

  app.listen(3000, ()=> console.log(">>> http://localhost:3000"));
```
* **webpack.config.js**中：
```JavaScript
  const path = require("path");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const CleanWebpackPlugin = require("clean-webpack-plugin");
+ const webpack = require("webpack");

  module.exports = {
    entry: {
-     app: "./src/index.js"
+     app: ['webpack-hot-middleware/client?noInfo=true&reload=true' , "./src/index.js"]
    },
    mode: "development",
    plugins: [
      new HtmlWebpackPlugin({
        title: "WebpackDevMiddleware"
      }),
      new CleanWebpackPlugin(["build"]),
+     new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/"
    }
  }
```
> *此时我们已经实现了项目的热更新，但并没有实现项目的热模块替换*
* **index.js** 中：
```JavaScript
  import _ from "lodash";

  import print from "./print.js";

  function createDom() {
    let div = document.createElement("div");
    let btn = document.createElement("input");
    btn.type = "button";
    btn.value = "click me";
    btn.addEventListener("click", print);
    div.appendChild(btn);
    return div;
  }

  document.body.appendChild(createDom());

+ if(module.hot) {
+   module.hot.accept("./print.js", () => {
+     console.log("Accepting the updated printMe module!")
+     print();
+   })
+ }
```