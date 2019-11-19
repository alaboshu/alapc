import timer from './timer'
export default {


  handleClick (jsThis, ev) {
    console.info('ev', ev)
    var date = new Date()
    var para = {
      timeType: ev.key
    }
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
    var refsData = jsThis.$refs[jsThis.widgetModel.reportTypeRadio]
    if (para.startTime !== undefined) {
      refsData.dataModel.condition = {
        ...refsData.dataModel.condition,
        ...para
      }
      refsData.init()
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
