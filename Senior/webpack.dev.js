const path = require('path');
const os = require('os');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const threads = os.cpus().length;

module.exports = {
  entry: './src/main.js',
  output: {
    path: undefined,
    filename: 'static/js/[name].js',
    // 打包生成的其他js文件命名，比如动态import生成的单独文件命名
    chunkFilename: "static/js/[name].chunk.js",
    // 图片，字体等通过type:asset处理资源的，统一使用assetModuleFilename命名
    assetModuleFilename: "static/media/[hash:10][ext][query]",
  },
  module: {
    rules: [
      {
        oneOf: [ // 文件类型从上到下匹配loader，匹配到后就不再往下继续匹配了
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
                maxSize: 20 * 1024
              }
            },
            // generator: {
            //   filename: 'static/imgs/[hash:10][ext][query]'
            // }
          },
          {
            test: /\.(ttf|woff2?|mp3|avi|mp4)$/i,
            type: 'asset/resource',
            // generator: {
            //   filename: 'static/media/[hash:10][ext][query]'
            // }
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 两种写法都可以，不能同时写
            include: path.resolve(__dirname, 'src'),
            use: [
              { // babel多进程打包
                loader: 'thread-loader',
                options: {
                  works: threads, // 配置进程数量
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true, // 开启babel缓存
                  cacheCompression: false, // 关闭对缓存文件的压缩
                  // Babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。默认情况下会被添加到每一个需要它的文件中。你可以引入 Babel runtime 作为一个独立模块，来避免重复引入。
                  plugins: ['@babel/plugin-transform-runtime'], // 在每个文件都插入了辅助代码，使代码体积过大
                }
              }
            ]
          },
          {
            test: /\.html$/i,
            loader: "html-loader",
          },
        ]
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, 'src'),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      cacheLocation: path.resolve(__dirname, 'node_modules/.cache/eslintcache'), // 缓存路径
      threads, // eslint 开启多进程打包和配置进程数量
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true, // 开发模式开启热模块替换（默认值）然后mainjs中手动配置
  },
  devtool: 'cheap-module-source-map', // 生产环境下启动服务时的资源报错映射到源文件具体位置
  mode: 'development',
};