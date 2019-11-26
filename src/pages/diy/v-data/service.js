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
          if (!widget.style) {
            widget.style = {}
          }
          widget.style.styleCss = this.getStyleCss(widget)
        }
      }
      return viewModel
    },
    // 动态修改样式
    getStyleCss (widget) {
      var resizeLayout = widget.resizeLayout
      var boxCss = `width: ${resizeLayout.w}px; height: ${resizeLayout.h}px;`
      if (widget.style && widget.style.css) {
        //  var modelCss = JSON.parse(widget.style.css)
        // console.info('sssss getStyleCss', widget.style.css, modelCss)
        // if (modelCss.bgColor) {
        //   boxCss = boxCss + ` background-color: ${modelCss.bgColor};`
        // }
        // if (modelCss.bgImage) {
        //   boxCss = boxCss + `background-image:url("${modelCss.bgImage}"); `
        // }
      }
      return boxCss
    }
  }
