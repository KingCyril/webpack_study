const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
    filename: 'static/js/main.js',
    clean: true,
  },
  module: {
    rules: [
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
        generator: {
          filename: 'static/imgs/[hash:10][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?|mp3|avi|mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[hash:10][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
    new MiniCssExtractPlugin({
      filename: "static/css/main.css"
    }),
    new CssMinimizerPlugin(),
  ],
  mode: 'production',
};