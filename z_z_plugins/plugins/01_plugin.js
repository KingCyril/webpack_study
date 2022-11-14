
/***
 * 同步钩子: tap
 * 异步钩子：tapAsync tapPromise
 *  异步串行钩子
 *  异步并行钩子
 */

module.exports = class TestPlugin {

  constructor() {
    console.log('TestPlugin constructor');
  }

  /**
   * 核心方法
   */
  apply(compiler) {
    debugger;
    console.log('TestPlugin apply', compiler);

    // 同步钩子
    compiler.hooks.environment.tap('TestPlugin', () => {
      console.log('TestPlugin environment hook');
    })

    /**
     * 异步串行钩子，一个一个干
     */
    compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log('TestPlugin emit tapAsync', compilation);
        callback();
      }, 2000);
    })

    compiler.hooks.emit.tapPromise('TestPlugin', (compilation) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('TestPlugin emit tapPromise');
          resolve()
        }, 1000);
      })
    })

    /**
     * 异步并行钩子,同时干
     */
    compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log('TestPlugin make tapAsync');
        callback();
      }, 2000);
    })

    compiler.hooks.make.tapPromise('TestPlugin', (compilation) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('TestPlugin make tapPromise');
          resolve()
        }, 1000);
      })
    })
  }
}