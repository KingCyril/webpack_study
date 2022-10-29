/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-10-29 12:49:19
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-10-29 13:31:46
 * @FilePath: /webpack_study/z_react-cli/src/pages/Home/index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import './index.css';

import { add } from '../../utils';

export default function Home(props) {
  console.log(props, add(1, 3, 4, 5));

  return <h2 className="home-title">Home~</h2>
}