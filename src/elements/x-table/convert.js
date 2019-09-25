export default {
  // 转换表格
  to (jsThis) {
    if (jsThis.$base.filter() === 3 || jsThis.$base.filter() === '3') {
      for (let item of jsThis.dataResult.tableActions) {
        if (item.url.toLowerCase().indexOf('api') < 0) {
          item.url = item.url.replace(/\/User\//g, '/Admin/')
        }
      }
    }
    if (jsThis.$base.filter() === 2 || jsThis.$base.filter() === '2') {
      for (let item of jsThis.dataResult.tableActions) {
        if (item.url.toLowerCase().indexOf('api') < 0) {
          item.url = item.url.replace(/\/Admin\//g, '/User/')
        }
      }
    }
  },
  // 数据加载完后，表格渲染
  apply (jsThis) {
    // 处理表格排序问题
    if (jsThis.dataResult.columns) {
      if (jsThis.dataResult.columns[0].label !== '操作') {
        jsThis.dataResult.columns.unshift(
          jsThis.dataResult.columns.splice(
            jsThis.dataResult.columns.length - 1,
            1
          )[0]
        )
      }
    }
  }
}
