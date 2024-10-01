const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        ws: true
      },
      '/socket': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/socket': ''
        },
        ws: true
      }
    }
  }
})