export default {
  // 将服务器数据格式转换成zk-auto-form所需要的格式
  toConfig (config) {
    if (!config.tooltip) {
      config.tooltip = {}
    }
    if (config && config.groups.length > 1) {
      config = this.toTabConfig(config)
    } else {
      config = this.toNoTabConfig(config)
    }
    return config
  },
  toTabConfig (autoFormConfig) {
    var formConfig = autoFormConfig
    formConfig.columns = []
    if (autoFormConfig && autoFormConfig.groups) {
      autoFormConfig.groups.forEach(group => {
        var tab = {
          type: 'tab',
          name: group.groupName,
          columns: group.items
        }
        formConfig.columns.push(tab)
      })
    }
    formConfig.type = 'tab'
    formConfig.groups = null
    console.info('标签类型', formConfig)
    return formConfig
  },
  toNoTabConfig (autoFormConfig) {
    if (autoFormConfig && autoFormConfig.groups.length > 0) {
      autoFormConfig.columns = autoFormConfig.groups[0].items
    }
    autoFormConfig.groups = null
    return autoFormConfig
  },
  // 获取图标
  geIcon () {
    var iconList = [
      'flaticon-puzzle',
      'flaticon-menu-button',
      'flaticon-interface-2',
      'flaticon-layers',
      'flaticon-apps'
    ]
    return iconList
  }
}
