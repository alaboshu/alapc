export default {
  // 导出表格操作
  async toExcel (jsThis, command) {
    var type = jsThis.$crud.getType(jsThis.$route, jsThis.widgetData)
    // 优先使用widgetData.value里面传来的参数
    if (
      jsThis.widgetData &&
      jsThis.widgetData.value !== null &&
      jsThis.widgetData.value !== undefined
    ) {
      if (
        jsThis.widgetData.value.table !== null &&
        jsThis.widgetData.value.table !== undefined
      ) {
        type = jsThis.widgetData.value.table.type
      }
    }

    if (jsThis.$route.query.key !== undefined) {
      type = jsThis.$route.query.key
    }
    if (command === 'exportTabl') {
      jsThis.fetchHandlersPara = {
        ...jsThis.fetchHandlersPara,
        pageIndex: jsThis.dataResult.result.pageIndex,
        pageSize: jsThis.dataResult.result.pageSize,
        ...jsThis.$crud.routeToObject(),
        type: type
      }

      var response = await jsThis.$api.httpGet(
        '/Api/Auto/ToExcel',
        jsThis.fetchHandlersPara
      )
      if (response.status === 1) {
        var exclePath = jsThis.$api.baseUrl() + response.message
        window.open(exclePath, '_blank')
      } else {
        jsThis.$notify({
          title: '操作失败',
          type: 'error',
          message: response.message,
          position: 'bottom-right'
        })
      }
    }
  }
}
