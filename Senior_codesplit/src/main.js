import sum from './sum';
// 此种引入会打包到mainjs中，初始化加载
// import { count as add } from './count';

console.log('main');
console.log(sum(1, 3));

document.getElementById('btn').onclick = function () {
  // 按需加载，代码分割打包到一个单独的js文件，用（click）的时候加载
  import('./count').then(res => {
    console.log(res.count(3, 4));
  }).catch(e => {
    console.log(e);
  })
}