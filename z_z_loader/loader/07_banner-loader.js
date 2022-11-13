const schema = require('./07.schma.json');

/**
 * 此loader可以添加作者信息
 */
module.exports = function (content) {
  /**
   * schema 是对options规则的验证
   * 是一个json对象
   */
  const options = this.getOptions(schema)

  const prefix = `
    /*
    * @author ${options.author}
    * @age ${options.age}
    */
  `
  return prefix + content;
}

/**
 * additionalProperties 除了定义的author和age外不允许传其他的参数
 */