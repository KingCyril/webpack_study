/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-10-28 19:54:24
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-10-29 13:25:11
 * @FilePath: /webpack_study/z_react-cli/src/app.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Suspense, lazy } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';

const Home = lazy(() => import(/* webpackChunkName: 'home'*/ './pages/Home'));
const About = lazy(() => import(/* webpackChunkName: 'about'*/ './pages/About'));

function App() {

  return (
    <div>
      <h1>App</h1>
      <hr />
      <ul>
        <Link to="/home" style={{ marginRight: '20px' }}>toHome</Link>
        <Link to="/about">toAbout</Link>
      </ul>
      <Suspense>
        <Routes fallback={<div>loading</div>}>
          <Route path="/home" element={<Home a={1} />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes >
      </Suspense>
    </div>
  )
}

export default App;