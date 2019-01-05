const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      // css资源管理
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      // 文件资源管理(图片)
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ["file-loader"]
      },
      // 文件资源管理(字体)
      {
        test: /\.(woff|woff2)$/,
        use: ["file-loader"]
      }
    ]
  }
}