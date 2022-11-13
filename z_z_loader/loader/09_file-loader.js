/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-11-13 19:23:36
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-11-13 19:38:48
 * @FilePath: /webpack_study/z_z_loader/loader/09_file-loader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const loaderUtils = require('loader-utils');

module.exports = function (content) {
  // 生成hash文件名
  const filename = loaderUtils.interpolateName(this, "[hash].[ext][query]", { content })
  // 输出文件
  this.emitFile(filename, content)
  // 返回文件路径
  return `module.exports = "${filename}"`
}

module.exports.raw = true;