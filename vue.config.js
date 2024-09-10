const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync('.\\certs\\frontend.com+5-key.pem'),
        cert: fs.readFileSync('.\\certs\\frontend.com+5.pem'),
      },
    },
    client: {
      webSocketURL: 'auto://localhost:8080/ws',
    },
    allowedHosts: 'all',
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        ws: true
      }
    }
  }
})