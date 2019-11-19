import timer from './timer'
export default {

  handleClick (jsThis, ev) {
    var para = {
      timeType: ev.key
    }
    // 自定义时间
    if (jsThis.activeName === 'customer' && ev !== null) {
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
