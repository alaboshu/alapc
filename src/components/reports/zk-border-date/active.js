export default {

  init (jsThis) {
    if (jsThis.iconType === null) {
      jsThis.iconShow = true
      if (!jsThis.icon) {
        jsThis.Icon = jsThis.$random.icon()
      } else {
        jsThis.Icon = jsThis.icon
      }
    } else {
      jsThis.iconShow = false
    }
    if (!jsThis.$api.isEmpty(jsThis.color)) {
      if (jsThis.color === 'brand') {
        jsThis.backGroundColor = '#716aca'
        jsThis.fontColor = '#ffffff'
      }
      if (jsThis.color === 'info') {
        jsThis.backGroundColor = '#36a3f7'
        jsThis.fontColor = '#ffffff'
      }
      if (jsThis.color === 'metal') {
        jsThis.backGroundColor = '#575962'
        jsThis.fontColor = '#ffffff'
      }
      if (jsThis.color === 'primary') {
        jsThis.backGroundColor = '#5867dd'
        jsThis.fontColor = '#ffffff'
      }
      if (jsThis.color === 'success') {
        jsThis.backGroundColor = '#34bfa3'
        jsThis.fontColor = '#ffffff'
      }
      if (jsThis.color === 'warning') {
        jsThis.backGroundColor = '#ffb822'
        jsThis.fontColor = '#ffffff'
      }
      if (jsThis.color === 'focus') {
        jsThis.backGroundColor = '#9816f4'
        jsThis.fontColor = '#ffffff'
      }
      if (jsThis.color === 'accent') {
        jsThis.backGroundColor = '#00c5dc'
        jsThis.fontColor = '#ffffff'
      }
      if (jsThis.color === 'danger') {
        jsThis.backGroundColor = '#f4516c'
        jsThis.fontColor = '#ffffff'
      }
      if (jsThis.color === 'light') {
        jsThis.backGroundColor = '#ffffff'
        jsThis.fontColor = '#575962'
      }
    }
  },
  // 日期选择组件的快捷按钮
  shortcut () {
    var pickerOptions = {
      shortcuts: [{
        text: '最近一周',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近一个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近半年',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
          picker.$emit('pick', [start, end])
        }
      }],
      disabledDate (time) {
        return time.getTime() > Date.now() - 8.64e6 // 如果没有后面的-8.64e6就是不可以选择今天的
      }
    }
    return pickerOptions
  }
}
