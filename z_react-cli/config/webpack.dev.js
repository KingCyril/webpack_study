const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'); // react js热更新插件

function getStyleLoader(pr) {
  return [
    'style-loader',
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
    path: undefined,
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hase:10][ext][query]"
  },
  module: {
    rules: [
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
        test: /\.(js|jsx)$/,
        // exclude: /node_modules/, // 两种写法都可以，不能同时写
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true, // 开启babel缓存
          cacheCompression: false, // 关闭对缓存文件的压缩
          plugins: ['@babel/plugin-transform-runtime', 'react-refresh/babel']
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
    new ReactRefreshWebpackPlugin(), // HMR
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true, // 解决路由 刷新404问题
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entrypoiint) => `runtime~${entrypoiint.name}.js`
    }
  },
  // webpack解析模块加载选项
  resolve: {
    // 自动补全文件扩展名
    extensions: ['.jsx', '.js', '.json']
  },
  devtool: 'cheap-module-source-map',
  mode: 'development'
}