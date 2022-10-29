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
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

const isProduction = process.env.NODE_ENV === 'production';

function getStyleLoader(pr) {
  return [
    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env']
        }
      }
    },
    pr && {
      loader: pr,
      options: pr === 'sass-loader' ? {
        additionalData: `@use "@/element-css/index.scss" as *;`,
      } : {}
    },
  ].filter(Boolean)
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: isProduction ? path.resolve(__dirname, './dist') : undefined,
    filename: isProduction ? "static/js/[name].[contenthash:10].js" : "static/js/[name].js",
    chunkFilename: isProduction ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hase:10][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
        options: {
          // 开启缓存
          cacheDirectory: path.resolve(__dirname, './node_modules/.cache/vue-loader')
        }
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
        include: path.resolve(__dirname, './src'),
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
      context: path.resolve(__dirname, './src'),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      cacheLocation: path.resolve(__dirname, './node_modules/.cache/eslintcache'), // 缓存路径
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    }),
    isProduction && new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:10].css',
      chunkFilename: 'static/css/[name].[contenthash:10].chunk.css'
    }),
    isProduction && new CopyPlugin({
      patterns: [
        { // 复制public下的index.html，因为要我们引入ico或者其他资源
          from: path.resolve(__dirname, './public'),
          to: path.resolve(__dirname, './dist'),
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
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        // 自定义主题，引入sass
        importStyle: "sass",
      })],
    }),
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vue: {
          test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
          name: 'vue-chunk',
          priority: 40,
        },
        elementPlus: {
          test: /[\\/]node_modules[\\/]element-plus[\\/]/,
          name: 'elementPlus-chunk',
          priority: 30,
        },
        rests: {
          test: /[\\/]node_modules[\\/]/,
          name: 'rests-chunk',
          priority: 20,
        }
      }
    },
    runtimeChunk: {
      name: (entrypoiint) => `runtime~${entrypoiint.name}.js`
    },
    minimize: isProduction,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugiin(),
      // new ImageMinimizerPlugin({  }), // 压缩图片 包下载有问题，不压缩了
    ],
  },
  // webpack解析模块加载选项
  resolve: {
    // 自动补全文件扩展名
    extensions: ['.vue', '.js', '.json'],
    // 路径别名
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true, // 解决路由 刷新404问题
  },
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  mode: isProduction ? 'production' : 'development',
  performance: false,
}