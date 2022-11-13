/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-11-13 16:27:30
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-11-13 16:29:52
 * @FilePath: /webpack_study/z_z_loader/loader/01_test-loader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


/**
 * loader本质就是函数
 * @param {*} content 文件内容
 * @param {*} map SourceMap
 * @param {*} meta 别的loader传递下来的数据
 * @returns 
 */
module.exports = function (content, map, meta) {
  console.log(content);
  return content;
}


/**
 * 同步loader
 * 异步loader
 * raw loader
 * pitch loader
 */