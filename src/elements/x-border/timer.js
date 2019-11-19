export default {
  // 格式化时间
  timeFormat (date) {
    if (!date || typeof (date) === 'string') {
      return
    }
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    return y + '-' + m + '-' + d
  },
  getTime (date, type) {
    // 获取本周的周一
    if (type === 'week') {
      var weekday = date.getDay() || 7
      date.setDate(date.getDate() - weekday + 1)
    }
    // 获取本月的第一天
    if (type === 'mounth') {
      date.setDate(1)
    }
    // 获取本年的第一天
    if (type === 'year') {
      date.setDate(1)
      date.setMonth(0)
    }
    return this.timeFormat(date)
  }
}
