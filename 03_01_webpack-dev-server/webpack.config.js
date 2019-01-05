const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/index.js",
    // print: "./src/print.js"
  },
  mode: "development",
  // ``````

  devtool: "inline-source-map", // 追踪到源文件
  devServer: {
    contentBase: "./build",
    hot: true
  },

  // ``````
  plugins: [
    new htmlWebpackPlugin({
      title: "Output-Management"
    }),
    new cleanWebpackPlugin(["build"]),

    // 热模块替换需要用到webpack内置的插件：
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build")
  }
}