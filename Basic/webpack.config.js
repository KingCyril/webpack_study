const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 绝对路径
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // 数组执行顺序，从右向左，从下向上
        // css-loader 将css样式资源编译成commonJs的模块到js中
        // style-loader 将js中的css通过创建style标签添加到html中，使样式生效
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        // 数组执行顺序，从右向左，从下向上
        // less-loader 将less文件编译成css资源
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        // 数组执行顺序，从右向左，从下向上
        // less-loader 将scss文件编译成css资源
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ]
  },
  plugins: [

  ],
  mode: 'development',
}