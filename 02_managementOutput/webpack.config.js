const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");

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
    new cleanWebpackPlugin(["build"])
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build")
  }
}