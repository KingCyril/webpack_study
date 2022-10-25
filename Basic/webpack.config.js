/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-10-25 19:10:53
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-10-25 21:43:10
 * @FilePath: /webpack_study/Basic/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 绝对路径
    // js打包资源路径
    filename: 'static/js/main.js',
    clean: true, // 自动清空上次打包结果
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
        // sass-loader 将sass文件编译成css资源
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/i,
        // 数组执行顺序，从右向左，从下向上
        // stylus-loader 将styl文件编译成css资源
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            //  少于20kb会转为base64 优点：减少网络请求 缺点：体积会变大，给大图片转得不偿失，因此只给小图片转
            maxSize: 20 * 1024 // 4kb
          }
        },
        generator: {
          // 图片打包资源路径 hash值只取前十位
          // filename: 'static/imgs/[hash][ext][query]',
          filename: 'static/imgs/[hash:10][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?|mp3|avi|mp4)$/i,
        type: 'asset/resource', // 不会转base64，所有不需要处理直接输出的资源都使用此type，比如音视频等
        generator: {
          // 图片打包资源路径 hash值只取前十位
          // filename: 'static/imgs/[hash][ext][query]',
          filename: 'static/media/[hash:10][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除，此文件夹不处理
        loader: 'babel-loader',
        // options: { // 注释掉，自己建文件配置babel
        //   presets: ['@babel/preset-env']
        // }
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ]
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, 'src'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
  // 开发服务器：不会输出打包资源的，只会在内存中编译打包
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
  },
  mode: 'development',
};