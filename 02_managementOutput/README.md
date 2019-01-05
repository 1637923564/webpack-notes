# 常用插件
## HtmlWebpackPlugin
> *如果我们更改了我们的一个入口起点的名称，甚至添加了一个新的名称，会发生什么？生成的包将被重命名在一个构建中，但是我们的index.html文件仍然会引用旧的名字。我们用 HtmlWebpackPlugin 来解决这个问题。*
```shell
$ npm i html-webpack-plugin -D
```
* **webpack.config.js** 中
```javascript
  const path = require("path");
+ const htmlWebpackPlugin = require("html-webpack-plugin");

  module.exports = {
    entry: {
      app: "./src/index.js",
      print: "./src/print.js"
    },
    mode: "development",
+   plugins: [
+     new htmlWebpackPlugin({
+       title: "Output-Management" // 网页标题，即html文件中：<title>Output-Management</title>
+     })
+   ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "build")
    }
  }
```

## CleanWebpackPlugin
> *webpack 会生成文件，然后将这些文件放置在 /dist 文件夹中，但是 webpack 无法追踪到哪些文件是实际在项目中用到的。通常，在每次构建前清理 /dist 文件夹，是比较推荐的做法，因此只会生成用到的文件。CleanWebpackPlugin 可以满足这个需求。*
```shell
$ npm i clean-webpack-plugin -D
```
webpack.config.js中：
```javascript
  const path = require("path");
  const htmlWebpackPlugin = require("html-webpack-plugin");
+ const cleanWebpackPlugin = require("clean-webpack-plugin");

  module.exports = {
    entry: {
      app: "./src/index.js",
      print: "./src/print.js"
    },
    mode: "development",
    plugins: [
      new htmlWebpackPlugin({
        title: "Output-Management"
      }),
+     new cleanWebpackPlugin(["build"]) // 传入的参数是要进行处理的文件
    ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "build")
    }
  }
```