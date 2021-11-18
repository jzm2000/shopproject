module.exports = {
  pages: {
    index: {
      /* 入口 */
      entry: 'src/main.js'
    },
  },
  /* 关闭语法检查 */
  lintOnSave: false,

  /* devServer: {
    proxy: 'http://localhost:5000'8*/

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      },

    }
  }
}