/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-11-13 16:14:27
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-11-13 19:58:29
 * @FilePath: /webpack_study/z_z_loader/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const path = require('path');
const HtmlWebpackPlubin = require("html-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "./loader/10_style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.js$/,
        loader: './loader/07_banner-loader',
        options: {
          author: 'cyril',
          age: 19,
        }
      },
      {
        test: /\.js$/,
        loader: './loader/08_babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: './loader/09_file-loader',
        type: 'javascript/auto'
      }
      // {
      //   test: /\.js$/,
      //   use: [
      //     './loader/02_sync-loader', './loader/03_async-loader'
      //   ]
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlubin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],
  mode: 'development',
}