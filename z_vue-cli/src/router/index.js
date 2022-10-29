/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-10-29 17:16:36
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-10-29 17:18:42
 * @FilePath: /webpack_study/z_vue-cli/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from 'vue-router';

const Home = () => import('../views/Home');
const About = () => import('../views/About');

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/about',
      component: About,
    }
  ]
})