/*
 * @Author: Cyril- 1978919203@qq.com
 * @Date: 2022-11-13 17:43:10
 * @LastEditors: Cyril- 1978919203@qq.com
 * @LastEditTime: 2022-11-13 17:50:55
 * @FilePath: /webpack_study/z_z_loader/loader/08_babel-loader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const schema = require('./08_schema.json');
const babel = require("@babel/core");

module.exports = function (content) {
  const cb = this.async();
  const options = this.getOptions(schema);

  babel.transform(content, options, function (err, result) {
    if (err) cb(err);
    else cb(null, result.code)
  });
}