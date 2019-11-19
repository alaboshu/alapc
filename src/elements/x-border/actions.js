import timer from './timer'
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
  },
  // 疯狂处理啊
  handleClick (jsThis, ev) {
    var date = new Date()
    var para = {}
    if (jsThis.activeName !== 'appoint') {
      if (jsThis.activeName === 'toDay') {
        para.startTime = timer.timeFormat(date)
        para.endTime = timer.timeFormat(date)
      } else if (jsThis.activeName === 'yesterDay') {
        para.startTime = timer.timeFormat(new Date(date.getTime() - 24 * 60 * 60 * 1000))
        para.endTime = timer.timeFormat(new Date(date.getTime() - 24 * 60 * 60 * 1000))
      } else if (jsThis.activeName === 'event') {
        para.startTime = ''
        para.endTime = ''
      } else {
        para.endTime = timer.timeFormat(date)
        para.startTime = timer.getTime(date, jsThis.activeName)
      }
    }
    // 自定义时间
    if (jsThis.activeName === 'appoint' && ev !== null) {
      para.startTime = timer.timeFormat(ev[0])
      para.endTime = timer.timeFormat(ev[1])
    }
    // 获取slot下组件实例
    var data = jsThis.$slots.default[0].context
    data.activeName = jsThis.activeName
    data.obtainTime = para
    if (para.startTime !== undefined) {
      data.inshow = false
      data.loading = true
      data.init()
    }
  }
}
