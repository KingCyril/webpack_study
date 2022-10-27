const path = require('path');
const os = require('os');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

// 获取电脑cpu核数
const threads = os.cpus().length;

/**
 * 封装cssLoader函数
 */
function getCssLoader(par) {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env'],
        },
      },
    },
    par,
  ].filter(Boolean);
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[hash:10].js',
    // 打包生成的其他js文件命名，比如动态import生成的单独文件命名
    chunkFilename: "static/js/[name].chunk.[hash:11].js",
    // 图片，字体等通过type:asset处理资源的，统一使用assetModuleFilename命名
    assetModuleFilename: "static/media/[hash:10][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [ // 文件类型从上到下匹配loader，匹配到后就不再往下继续匹配了
          {
            test: /\.css$/i,
            use: getCssLoader(),
          },
          {
            test: /\.less$/i,
            use: getCssLoader("less-loader"),
          },
          {
            test: /\.s[ac]ss$/i,
            use: getCssLoader("sass-loader"),
          },
          {
            test: /\.styl$/i,
            use: getCssLoader("stylus-loader"),
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
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.css",
    }),
    new PreloadWebpackPlugin({ // 动态import资源在浏览器空闲的时候预加载
      // rel: 'preload',
      // as: 'script'
      rel: 'prefetch',
    }),
    new WorkboxPlugin.GenerateSW({  // PWA离线访问技术，缓存到浏览器applation cache stroge中，要在mainjs中注册 注意serviceWorker需要在项目根目录下才能访问到，因策使用npm i serve -g;serve dist开启一个服务，禁网亦可访问
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  optimization: { // 压缩打包文件配置
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(), // 压缩css文件
      new TerserWebpackPlugin({ // 多进程压缩js，如果不开启多进程可以不写此插件，内置默认生产模式压缩
        parallel: threads,
      }),
      new ImageMinimizerPlugin({ // 压缩图片
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmInsOrder: "alphabetical"
                      }
                    }
                  ]
                },
              ],
            ],
          }
        },
      }),
    ],
    // 代码分割配置，其他都用默认配置即可
    // 作用：如果存在动态import，则会单独生成一个打包文件，用的时候再加载
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}.js`,
    },
  },
  devtool: 'source-map', // 开发环境下打包后的资源报错映射到源文件具体位置
  mode: 'production',
};