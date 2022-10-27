/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-10-25 20:48:31
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-10-25 20:52:55
 * @FilePath: /webpack_study/Basic/.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  // 继承eslint官方规则
  extends: ["eslint:recommended"],
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    }
  },
  env: {
    "browser": true,
    "node": true,
  },
  rules: { // 对继承规则不满意可以重写覆盖规则
    "semi": "error",
    "no-var": 2
  },
  plugins: ['import'],
};