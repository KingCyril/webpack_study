/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-11-13 16:31:01
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-11-13 16:40:13
 * @FilePath: /webpack_study/z_z_loader/loader/02_sync-loader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


/**
 * 第一种写法
 */
// module.exports = function (content, map, meta) {
//   return content;
// }


/**
 * 第二种写法
 */
module.exports = function (content, map, meta) {
  /**
   * 第一个参数 代表是否有错误
   * 第二个参数 处理后的内容
   * 第三个参数 继续传递SourceMap
   * 第四个参数 继续传递参数 
   */
  console.log('同步loader', content);
  this.callback(null, content, map, meta);
}