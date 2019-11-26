  import theme from '@/service/core/theme'
  export default {
    // 模块结构处理
    convertTo (viewModel) {
      viewModel = theme.filerPageInfo(viewModel)
      if (viewModel && viewModel.widgets) {
        for (let widget of viewModel.widgets) {
          if (!widget.resizeLayout) {
            var para = {
              y: 0,
              x: 0,
              w: 300,
              h: 300
            }
            widget.resizeLayout = para
          }
          // 处理边框
          if (widget.style && widget.style.border) {
            widget.style.border = JSON.parse(widget.style.border)
          }
        }
      }
      console.info('i处理模块的viewModel内部', viewModel)
      return viewModel
    }
  }
