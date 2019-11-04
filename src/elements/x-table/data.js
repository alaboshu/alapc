// 搜索、标签、分页，相关操作
// 点击标签

import convert from './convert'
import format from './format'
import api from '@/service/prototypes/api'
import crud from '@/service/prototypes/crud'
export default {
  beforeInit (jsThis, type, columns) {
    // 数据初始化
    jsThis.dataResult = {
      tableActions: [],
      tabs: [],
      searchOptions: [],
      icon: null,
      name: null,
      result: {
        result: [], // 数据源,
        pageSize: 15,
        pageCount: 1,
        pageIndex: 1,
        recoudSite: 1,
        recordCount: 0
      }
    }
    jsThis.async = false
    jsThis.loading = true
    // 以上为数据初始化

    jsThis.dataSourceConfig = {
      type: jsThis.type,
      columns: jsThis.columns
    }
    if (!jsThis.dataSourceConfig.type) {
      jsThis.dataSourceConfig.type = type
    }
    if (columns) {
      jsThis.dataSourceConfig.columns = columns
    }
    if (!jsThis.dataSourceConfig.type) {
      // 从路由获取参数
      jsThis.dataSourceConfig.type = crud.getType()
    }
    if (!jsThis.dataSourceConfig.type) {
      jsThis.$alert('类型type不能为空')
      return
    }
    format.style(jsThis)
    convert.to(jsThis)
  },
  // 获取数据
  async fetchDatas (jsThis) {
    if (!api.isEmpty(jsThis.data)) {
      jsThis.dataResult.result.result = jsThis.data
      jsThis.loading = false
      return
    }
    jsThis.loading = true
    let {
      fetchHandlersPara
    } = jsThis
    let apiUrl = '/Api/Auto/Table'

    var parameters = {}

    fetchHandlersPara = {
      ...fetchHandlersPara,
      ...parameters,
      pageIndex: jsThis.dataResult.result.pageIndex,
      pageSize: jsThis.dataResult.result.pageSize,
      type: jsThis.dataSourceConfig.type,
      ...crud.routeToObject()
    }
    var response = await api.httpGet(apiUrl, fetchHandlersPara)
    console.info('表格参数结果：', fetchHandlersPara, response)
    if (jsThis.$base.isBuild() === false) {
      console.info('表格参数结果：', fetchHandlersPara, response)
    }
    if (response.status === 1) {
      jsThis.dataResult = response.result
      if (jsThis.dataSourceConfig.columns) {
        jsThis.dataResult.columns = jsThis.dataSourceConfig.columns
      }
      jsThis.loading = false
      jsThis.async = true
      jsThis.$nextTick(() => {
        jsThis.$refs.searchForm.init(jsThis.dataResult.searchOptions)
      })
      convert.apply(jsThis)
      convert.handle(jsThis)
    } else {
      jsThis.$notify({
        title: '操作失败',
        type: 'error',
        message: response.message,
        position: 'bottom-right'
      })
    }
  },

  // 搜索
  search (jsThis, paramenter) {
    jsThis.dataResult.result.pageSize = 15
    jsThis.dataResult.result.pageIndex = 1
    jsThis.fetchHandlersPara = {
      ...jsThis.fetchHandlersPara,
      ...paramenter
    }
    jsThis.fetchHandler()
  },
  // 标签搜索
  tabClick (jsThis, tab, tabIndex) {
    jsThis.dataResult.result.pageIndex = 1
    if (tabIndex !== '0') {
      var tabResult = {}
      tabResult[tab.name] = tab.key
      jsThis.fetchHandlersPara = {
        ...jsThis.fetchHandlersPara,
        ...tabResult
      }
    } else {
      jsThis.fetchHandlersPara = {}
    }
    jsThis.fetchHandler()
  },
  // 获取参数
  getParameters (jsThis, widgetData) {
    var parameters = {}
    if (!api.isEmpty(widgetData.parameters)) {
      widgetData.parameters.forEach(par => {
        if (par.key) {
          parameters[par.key] = par.value
        } else {
          parameters[par.key] = []
        }
      })
      return parameters
    }
  }
}
