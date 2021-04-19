module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        //代理请求，解决跨域问题
        target: process.env.VUE_APP_APIURL,
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
