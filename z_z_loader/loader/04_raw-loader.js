/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-11-13 16:43:33
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-11-13 16:44:49
 * @FilePath: /webpack_study/z_z_loader/loader/04_raw-loader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/**
 * raw loader content接收到的数据是Buffer类型
 */
module.exports = function (content, map, meta) {
  console.log(content);
  return content;
}

module.exports.raw = true;