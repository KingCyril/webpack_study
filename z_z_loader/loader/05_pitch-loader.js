/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-11-13 16:47:08
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-11-13 16:56:24
 * @FilePath: /webpack_study/z_z_loader/loader/05_pitch-loader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

module.exports = function (content, map, meta) {
  return content;
}

module.exports.pitch = function () {

}

/**
 * pitch 执行时机
 */
/**
 * {
 *  test:/\.js$/,
 *  use:['loader1','loader2','loader3'],
 * }
 * 先执行pitch方法 loader1.pitch ---> loader2.pitch() ---> loader3.pitch()
 * 再执行loader方法 loader3() ---> loader2() ---> loader1()
 *
 *
 * 如果在某个pitch方法return了，后边的都不执行了，直接回到上一个pitch的loader方法
 * 比如loader2.pitch函数return了，执行结果是 loader1.pitch ---> loader2.pitch() ---> loader1()
 */