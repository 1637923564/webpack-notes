const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: ['webpack-hot-middleware/client?noInfo=true&reload=true' , "./src/index.js"]
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "WebpackDevMiddleware"
    }),
    new CleanWebpackPlugin(["build"]),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/"
  }
}