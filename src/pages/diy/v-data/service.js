  import theme from '@/service/core/theme'
  export default {
    // 模块结构处理
    convertTo (viewModel) {
      viewModel = theme.filerPageInfo(viewModel)
      if (this.viewModel && this.viewModel.widgets) {
        for (let i of this.viewModel.widgets) {
          if (!i.resizeLayout) {
            var para = {
              y: 0,
              x: 0,
              w: 500,
              h: 500,
              zIndex: 1
            }
            i.resizeLayout = para
          }
        }
      }
      console.info('处理模块的viewModel', viewModel)
      return viewModel
    }
  }
