const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: undefined,
    filename: 'static/js/main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/i,
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
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
  },
  mode: 'development',
};