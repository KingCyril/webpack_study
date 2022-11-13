/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-11-13 16:34:14
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-11-13 16:39:38
 * @FilePath: /webpack_study/z_z_loader/loader/03_async-loader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE 
 */

module.exports = function (content, map, meta) {
  const cb = this.async();

  setTimeout(() => {
    console.log('异步loader', content);
    cb(null, content, map, meta);
  }, 2000);
}