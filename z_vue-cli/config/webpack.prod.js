const path = require('path');
const { DefinePlugin } = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css提取
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'); // css压缩
const TerserWebpackPlugiin = require('terser-webpack-plugin'); // js压缩
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin"); // 复制index.html
const { VueLoaderPlugin } = require('vue-loader');

function getStyleLoader(pr) {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env']
        }
      }
    },
    pr,
  ].filter(Boolean)
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "static/js/[name].[contenthash:10].js",
    chunkFilename: "static/js/[name].[contenthash:10].chunk.js",
    assetModuleFilename: "static/media/[hase:10][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/i,
        use: getStyleLoader(),
      },
      {
        test: /\.less$/i,
        use: getStyleLoader('less-loader'),
      },
      {
        test: /\.s[ac]ss$/i,
        use: getStyleLoader('sass-loader'),
      },
      {
        test: /\.styl$/i,
        use: getStyleLoader('stylus-loader'),
      },
      {
        test: /\.(jpe?g|png|svg|gif|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024
          }
        },
      },
      {
        test: /\.(ttf|woff2?|mp3|avi|mp4)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(js)$/,
        // exclude: /node_modules/, // 两种写法都可以，不能同时写
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true, // 开启babel缓存
          cacheCompression: false, // 关闭对缓存文件的压缩
          plugins: ['@babel/plugin-transform-runtime']
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ]
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'), // 缓存路径
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:10].css',
      chunkFilename: 'static/css/[name].[contenthash:10].chunk.css'
    }),
    new CopyPlugin({
      patterns: [
        { // 复制public下的index.html，因为要我们引入ico或者其他资源
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          globOptions: {
            ignore: ["**/index.html"], // webpack打包忽略index.html，不打包，直接由插件复制
          },
        },
      ],
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({ // 定义一些环境变量给源代码使用，从而解决vue3页面警告问题
      // runtime-core.esm-bundler.js:4999 Feature flags __VUE_OPTIONS_API__, __VUE_PROD_DEVTOOLS__ are not explicitly defined.
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entrypoiint) => `runtime~${entrypoiint.name}.js`
    },
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugiin(),
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
  },
  // webpack解析模块加载选项
  resolve: {
    // 自动补全文件扩展名
    extensions: ['.vue', '.js', '.json']
  },
  devtool: 'source-map',
  mode: 'production',
}