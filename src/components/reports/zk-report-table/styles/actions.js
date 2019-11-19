export default {
  // 获取报表数据
  async getReport (jsThis, dataModel) {
    var para = {
      ...dataModel
    }
    var response = await jsThis.$api.httpPost(jsThis.reportApi, para)
    if (response.status === 1) {
      jsThis.chartData = response.result
      jsThis.chartSettings.type = response.result.type
    } else {
      jsThis.$alert('配置出错，数据请求不成功，请重新配置')
    }
  },
  // 获取表格数据
  async getTable (jsThis, dataModel) {
    var para = {
      ...dataModel
    }
    para.pageIndex = 1
    var tableresponse = await jsThis.$api.httpPost(jsThis.tableApi, para)
    if (tableresponse.status === 1) {
      this.getTableList(tableresponse.result.columns)
      jsThis.tableData = tableresponse.result
      // jsThis.$set(jsThis.tableData, tableresponse.result)
    } else {
      jsThis.$alert('配置出错，数据请求不成功，请重新配置')
    }
  },

  // 分页功能
  async pageChange (jsThis, ev) {
    var para = {
      ...jsThis.dataModel
    }
    jsThis.currentPage = ev
    para.pageIndex = ev
    var tableresponse = await jsThis.$api.httpPost('/api/Report/GetCountTable', para)
    if (tableresponse.status === 1) {
      this.getTableList(tableresponse.result.columns)
      jsThis.tableData = tableresponse.result
    } else {
      jsThis.$alert('配置出错，数据请求不成功，请重新配置')
    }
  },

  // 处理表格数据
  getTableList (data) {
    if (data && data.length > 0) {
      for (let i in data) {
        if (data[i] === '比率') {
          data.splice(0, 0, data.splice(i, 1)[0])
        }
        if (data[i] === '日期') {
          data.splice(1, 0, data.splice(i, 1)[0])
        }
      }
    }
  },


  chartType (type) {
    switch (type) {
      case 0:
        return 'line'
      case 1:
        return 'histogram'
      case 2:
        return 'bar'
      case 3:
        return 'pie'
      case 4:
        return 'ring'
      case 11:
        return 'scatter'
      default:
        return 'line'
    }
  }
}
