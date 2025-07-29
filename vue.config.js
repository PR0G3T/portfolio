const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/CV/' : '/',
  outputDir: 'dist',
  assetsDir: 'static'
})