/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-10-29 13:30:16
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-10-29 13:31:17
 * @FilePath: /webpack_study/z_react-cli/src/utils/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const add = (...argus) => {
  return argus.reduce((p, c) => p + c, 0)
}