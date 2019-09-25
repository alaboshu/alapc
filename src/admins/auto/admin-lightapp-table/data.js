export default {
  toConfig (dataJson, widget, widgetModel) {
    var config
    if (dataJson !== null) {
      if (dataJson.list[0].type === 'tab') {
        config = this.toTabConfig(dataJson, widget, widgetModel)
      } else {
        config = this.toNotTabConfig(dataJson, widget, widgetModel)
      }
      return config
    }
  },
  toTabConfig (dataJson, widget, widgetModel) {
    var tableConfig = {}
    var columns = []
    dataJson.list[0].columns.forEach(item => {
      item.list.forEach(list => {
        var listItem = {
          label: list.name,
          prop: list.model,
          width: 120,
          type: null
        }

        columns.push(listItem)
      })
    })
    columns.push({
      label: '操作',
      options: null,
      prop: 'action',
      type: null,
      width: '120'
    })
    tableConfig = {
      name: widget.title,
      columns: columns,
      result: {
        result: widgetModel
      }
    }
    return tableConfig
  },
  toNotTabConfig (dataJson, widget, widgetModel) {
    var tableConfig = {}
    var columns = []
    dataJson.list.forEach(item => {
      var listItem = {
        label: item.name,
        prop: item.model,
        width: 120,
        type: item.type
      }
      columns.push(listItem)
    })
    columns.push({
      label: '操作',
      options: null,
      prop: 'action',
      type: null,
      width: '120'
    })
    tableConfig = {
      name: widget.title,
      columns: columns,
      result: {
        result: widgetModel
      }
    }
    return tableConfig
  }
}
