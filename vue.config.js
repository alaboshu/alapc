module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        'src/assets/style/theme.scss'
      ]
    }
  },
  productionSourceMap: false,
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        _style: `@/assets/style`
      }
    },
    devServer: {
      host: '0.0.0.0',
      port: '2008',
      disableHostCheck: true
    }
  },
  chainWebpack(config) {

  }
}
