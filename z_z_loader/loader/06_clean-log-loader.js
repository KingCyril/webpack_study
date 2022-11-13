/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-11-13 17:03:01
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-11-13 17:04:18
 * @FilePath: /webpack_study/z_z_loader/loader/06_clean-log-loader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = function (content) {
  return content.replace(/console\.log\(.*\);?/g, "")
}