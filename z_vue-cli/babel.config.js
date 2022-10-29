/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-10-29 16:38:47
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-10-29 18:13:46
 * @FilePath: /webpack_study/z_vue-cli/babel.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}