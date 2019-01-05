const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const config = require("./webpack.config.js");

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.plugins.publicPath
}))
app.use(webpackHotMiddleware(compiler, {
  heartbeat: 2000,
}));

app.listen(3000, () => console.log(">>> http://localhost:3000"));