export default {
  // 将服务器数据格式转换成zk-auto-form所需要的格式
  toConfig (config) {
    if (!config.tooltip) {
      config.tooltip = {}
    }
    console.info('config', config)
    if (config && config.groups && config.groups.length > 1) {
      config = this.toTabConfig(config)
    } else {
      config = this.toNoTabConfig(config)
    }
    config = this.setRules(config)
    return config
  },
  // 设置验证规格
  setRules (config) {
    config.rules = {}
    if (config.columns) {
      config.columns.forEach(r => {
        if (r.type === 'tab') {
          r.columns.forEach(c => {
            config.rules[c.field] = this.getRuleData(c)
          })
        } else {
          config.rules[r.field] = this.getRuleData(r)
        }
      })
    }
    console.info('config')
    return config
  },
  getRuleData (column) {
    var array = []
    var data = {
      required: false,
      message: `请输入${column.name},${column.name}不能为空`,
      trigger: 'blur'
    }
    if (column.required) {
      data.required = true
    }
    array.push(data)
    return array
  },
  toTabConfig (autoFormConfig) {
    var formConfig = autoFormConfig
    formConfig.columns = []
    if (autoFormConfig && autoFormConfig.groups) {
      autoFormConfig.groups.forEach((group, index) => {
        var tab = {
          type: 'tab',
          icon: this.geIcon()[index],
          name: group.groupName,
          columns: group.items
        }
        formConfig.columns.push(tab)
      })
    }
    formConfig.type = 'tab'
    formConfig.groups = null
    return formConfig
  },
  toNoTabConfig (autoFormConfig) {
    if (autoFormConfig && autoFormConfig.groups && autoFormConfig.groups.length > 0) {
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
