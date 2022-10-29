/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-10-28 19:54:24
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-10-29 15:06:32
 * @FilePath: /webpack_study/z_react-cli/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
// 引入antd样式
import 'antd/dist/antd.less';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);