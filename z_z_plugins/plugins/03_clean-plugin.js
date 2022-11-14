/**
 * 每次打包自动清除上一次打包结果
 */
module.exports = class CleanWebpackPlubin {

  apply(compiler) {
    // 获取打包输出的目录
    const outputPath = compiler.options.output.path;
    const fs = compiler.outputFileSystem;

    compiler.hooks.emit.tapAsync("CleanWebpackPlubin", compilation => {
      this.removeFiles(fs, outputPath);
    })
  }

  removeFiles(fs, filePath) {
    // 读取当前目录下的所有资源
    const files = fs.readdirSync(filePath);
    // 
    files.forEach(file => {
      const path = `${filePath}/${file}`;
      // 文件信息
      const fileStat = fs.statSync(path);
      if (fileStat.isDirectory()) {
        // 是文件夹，删除文件夹内的文件
        this.removeFiles(fs, path)
      } else {
        fs.unlinkSync(path)
      }
    })
  }
}