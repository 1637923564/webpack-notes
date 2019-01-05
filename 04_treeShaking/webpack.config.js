const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({ title: "tree shaking" }),
    new CleanWebpackPlugin(["build"])
  ],
  devServer: { contentBase: "./build" },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build")
  }
}