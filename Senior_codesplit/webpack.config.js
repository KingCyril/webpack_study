const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 多入口 配置
 */
module.exports = {
  entry: {
    app: './src/app.js',
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],
  optimization: {
    // 分割代码，app和main双入口都引入了sum函数，打包后这两个出口都会把sum函数打包进去，代码没复用，因此配置生成公共代码包，让其都引用
    // 实际开发中使用默认配置即可，由于测试代码体积较小，才配置default使其能够生效
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        default: {
          minSize: 0,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      }
    }
  },
  mode: 'production',
}

/**
 * 单入口文件配置
 */
// module.exports = {
//   entry: './src/main.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'main.js',
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, 'public/index.html')
//     })
//   ],
//   optimization: {
//     // 分割代码，app和main双入口都引入了sum函数，打包后这两个出口都会把sum函数打包进去，代码没复用，因此配置生成公共代码包，让其都引用
//     // 实际开发中使用默认配置即可，由于测试代码体积较小，才配置default使其能够生效
//     splitChunks: {
//       chunks: "all",
//     }
//   },
//   mode: 'production',
// }