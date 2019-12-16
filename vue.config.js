
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        'src/assets/style/theme.scss',
        'src/assets/style/variable.scss',
        'src/assets/style/sass/_index.scss'
      ]
    }
  },
  productionSourceMap: false,
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        flyio: 'flyio/dist/npm/fly',
        wx: `@/src/service/prototypes/api/wx`,
        _style: `@/assets/style/pc`,
        _style_all: '@/assets/style',
        _router: '@/service/router/routers.js',
        _js: `@/service/utils`
      }
    },
    module: {
      rules: [{
        test: /\.scss$/,
        loader: './lib/variable-loader'
      }]
    },
    devServer: {
      host: '0.0.0.0',
      port: '2008',
      disableHostCheck: true
    }
  },
  chainWebpack (config) {

  }
}
