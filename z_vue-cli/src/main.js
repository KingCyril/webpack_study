/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-10-29 16:21:26
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-10-29 18:23:37
 * @FilePath: /webpack_study/z_vue-cli/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
/**
 * 全部引入elementui库所有组件和样式
 */
// import ElementPlus from 'element-plus';
import "element-plus/dist/index.css";

import router from './router';
import App from './App';

createApp(<App />)
  .use(router)
  // .use(ElementPlus)
  .mount('#app')