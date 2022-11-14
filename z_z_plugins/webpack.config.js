/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-11-13 20:05:49
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-11-13 20:13:47
 * @FilePath: /webpack_study/z_z_plugins/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const path = require('path');

const TestPlugin = require('./plugins/03_clean-plugin.js')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    // clean: true,
  },
  module: {

  },
  plugins: [
    new TestPlugin()
  ],
  mode: "production"
}