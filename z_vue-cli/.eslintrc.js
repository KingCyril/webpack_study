/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-10-29 16:35:55
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-10-29 16:37:15
 * @FilePath: /webpack_study/z_vue-cli/.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  }
}