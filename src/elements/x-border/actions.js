export default {
  init (jsThis, border) {
    if (jsThis.icon) {
      jsThis.viewModel.icon = jsThis.icon
    }
    if (jsThis.title) {
      jsThis.viewModel.title = jsThis.title
    }
    if (jsThis.desc) {
      jsThis.viewModel.description = jsThis.desc
    }
    if (border) {
      if (border.title) {
        jsThis.viewModel.title = border.title
      }
      if (border.description) {
        jsThis.viewModel.description = border.description
      }
      if (border.icon) {
        if (border.icon.name.includes('fa-') !== -1) {
          jsThis.viewModel.icon = border.icon.name
        }
      }
    }
    if (!jsThis.viewModel.icon) {
      jsThis.viewModel.icon = jsThis.$random.icon()
    }

    var borderType = jsThis.type
    if (border && border.type) {
      borderType = border.type
    }
    this.convert(jsThis, borderType)
  },
  // 边框颜色
  convert (jsThis, type) {
    if (type === 'brand') {
      jsThis.backGroundColor = '#716aca'
      jsThis.fontColor = '#ffffff'
    } else if (type === 'info') {
      jsThis.backGroundColor = '#36a3f7'
      jsThis.fontColor = '#ffffff'
    } else if (type === 'metal') {
      jsThis.backGroundColor = '#575962'
      jsThis.fontColor = '#ffffff'
    } else if (type === 'primary') {
      jsThis.backGroundColor = '#5867dd'
      jsThis.fontColor = '#ffffff'
    } else if (type === 'success') {
      jsThis.backGroundColor = '#34bfa3'
      jsThis.fontColor = '#ffffff'
    } else if (type === 'warning') {
      jsThis.backGroundColor = '#ffb822'
      jsThis.fontColor = '#ffffff'
    } else if (type === 'focus') {
      jsThis.backGroundColor = '#9816f4'
      jsThis.fontColor = '#ffffff'
    } else if (type === 'accent') {
      jsThis.backGroundColor = '#00c5dc'
      jsThis.fontColor = '#ffffff'
    } else if (type === 'danger') {
      jsThis.backGroundColor = '#f4516c'
      jsThis.fontColor = '#ffffff'
    } else if (type === 'light') {
      jsThis.backGroundColor = '#ffffff'
      jsThis.fontColor = '#575962'
    } else {
      jsThis.backGroundColor = '#ffffff'
      jsThis.fontColor = '#575962'
    }
  }
}
