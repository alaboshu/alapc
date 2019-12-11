export default {
  // 获取可以显示的列表
  getShowModel (jsThis, data) {
    var showData = []
    if (data) {
      data.forEach(element => {
        if (element.isEnable) {
          showData.push(element)
        }
      })
    }
    return showData
  }
}
