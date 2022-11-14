
/**
 * 添加作者信息plugin
 */
module.exports = class BannerWebpackPlugin {

  constructor(options = {}) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync("BannerWebpackPlugin", (compilation, callback) => {
      // 只给css和js文件添加
      const extensions = ['css', 'js'];
      const assets = Object.keys(compilation.assets).filter(assetPath => {
        const spilted = assetPath.split('.')
        const ext = spilted[spilted.length - 1];
        return extensions.includes(ext)
      })

      const prefix = `
        /**
         * @author ${this.options.author}
         */
      `
      assets.forEach(asset => {
        // 获取原打包完成文件
        const source = compilation.assets[asset].source();
        // 添加注释
        const cot = prefix + source;

        compilation.assets[asset] = {
          source() {
            return cot;
          },
          size() {
            return cot.length;
          }
        }
      })

      callback()
    })
  }
}