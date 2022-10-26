/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-10-25 19:10:53
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-10-26 07:58:09
 * @FilePath: /webpack_study/Basic/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import sum from './js/sum';

// 引入样式
import './styles/iconfont.css';
import './styles/common.css';
import './styles/common.less';
import './styles/common.scss';
import './styles/common.sass';
import './styles/common.styl';

import './video/wife.mp4';

const a = 2;
console.log(a);
console.log(sum(1, 3, 5, 4));

if (module.hot) {
  // 热模块替换：css-loader内置了样式的热模块替换，而js的话得手动配置，比如sum.js
  module.hot.accept('./js/sum.js');
}