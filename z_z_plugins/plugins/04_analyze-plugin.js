/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-11-14 19:51:14
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-11-14 19:59:27
 * @FilePath: /webpack_study/z_z_plugins/plugins/04_analyze-plugin.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 分析webpack打包资源的大小
 */

module.exports = class AnalyzeWebpackPlugiin {

  apply(compiler) {
    compiler.hooks.emit.tapAsync("AnalyzeWebpackPlugiin", (compilation, callback) => {
      const assets = Object.entries(compilation.assets);

      let content = `| 资源名称 ｜ 资源大小 ｜ \n| --- ｜ --- ｜`;

      assets.forEach(([filename, file]) => {
        content += `\n| ${filename} | ${Math.random(file.size())}kb |`
      })

      compilation.assets["analyze.md"] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        }
      }

      callback()
    })
  }
}