/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-10-25 19:10:53
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-10-25 20:55:05
 * @FilePath: /webpack_study/Basic/src/js/sum.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function (...argus) {
  return argus.reduce((pre, cur) => pre + cur, 0);
}

export const a = 2;