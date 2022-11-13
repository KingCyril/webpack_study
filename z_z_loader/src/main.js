
import './common.css'
const a = 1;
console.log('Cyril');

function add(...args) {
  return args.reduce((pre, cur) => pre + cur, 0)
}

console.log(add(1, 3, 5, 6, 7));