/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-10-25 21:16:48
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-10-25 21:20:32
 * @FilePath: /webpack_study/Basic/babel.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  // 智能预设，能够将一些高级语法打包低级语法
  presets: [
    [
      '@babel/preset-env',
      { // 配置预设corjs，自动引入使用的相关高级语法的包。无需自定义引入import 'core-js'
        useBuiltIns: 'usage',
        corejs: { version: "3.8", proposals: true },
      }
    ]
  ]
};