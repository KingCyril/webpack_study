/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-11-13 19:44:43
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-11-13 20:03:29
 * @FilePath: /webpack_study/z_z_loader/loader/10_style-loader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

module.exports = function (content) {

}

module.exports.pitch = function (remainingRequest) {
  // 绝对路径变成相对路径
  const relativePath = remainingRequest.split('!').map(absolutePath => {
    return this.utils.contextify(this.context, absolutePath)
  }).join('!')
  console.log(relativePath); // ../node_modules/css-loader/dist/cjs.js!./common.css
  // 引入cssloader处理后的资源
  // 动态创建标签插入页面
  const script = `
    import style from "!!${relativePath}";
    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl)
  `

  return script;
}