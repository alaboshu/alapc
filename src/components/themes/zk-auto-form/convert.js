export default {
  // 将服务器数据格式转换成zk-auto-form所需要的格式
  async toConfig (serviceConfig) {
    var config
    if (serviceConfig.groups.length > 1) {
      config = await this.toTabConfig(serviceConfig)
    } else {
      config = await this.toNoTabConfig(serviceConfig)
    }
    return config
  },
  async toTabConfig (serviceConfig) {
    var formConfig = {}
    formConfig.config = {
      name: serviceConfig.name,
      title: serviceConfig.title,
      bottonText: serviceConfig.bottonText,
      apiUrl: serviceConfig.service.postApi,
      successReturn: serviceConfig.service.successReturn
    }
    formConfig.list = []
    var tab = {
      type: 'tab',
      name: '标签',
      columns: [],
      icon: '',
      options: {},
      key: 590,
      model: 'tab_599',
      rules: ''
    }
    serviceConfig.groups.forEach(colunms => {
      var colunmsList = {
        name: colunms.groupName,
        list: []
      }
      colunms.items.forEach(items => {
        var item = {}
        item.dataSource = items.dataSource
        item.value = items.value
        item.type = this.getType(items.type)
        item.name = items.name
        item.icon = items.icon
        item.helpBlock = items.helpBlock
        item.model = items.field
        item.options = {
          placeholder: items.placeHolder
        }
        if (serviceConfig.isCms !== undefined && serviceConfig.isCms === true) {
          item.isCms = true
        }
        item.rules = items.rules
        item.required = items.required
        colunmsList.list.push(item)
      })
      tab.columns.push(colunmsList)
    })
    //   formConfig.config.name’
    formConfig.list.push(tab)
    return formConfig
  },
  async toNoTabConfig (serviceConfig) {
    var activitySku = {}
    activitySku.config = {
      bottonText: serviceConfig.bottonText,
      name: serviceConfig.name,
      title: serviceConfig.title,
      alertText: serviceConfig.alertText,
      buttomHelpText: serviceConfig.buttomHelpText
    }
    activitySku.list = []
    serviceConfig.groups[0].items.forEach((item, itemIndex) => {
      var objectItem = {
        type: item.type,
        name: item.name,
        dataSource: item.dataSource,
        model: item.field,
        helpBlock: item.helpBlock,
        rules: item.rules,
        icon: item.icon,
        value: item.value,
        jsonItems: item.jsonItems,
        options: {
          placeholder: item.placeHolder,
          sortOrder: item.sortOrder,
          editShow: item.editShow,
          listShow: item.listShow,
          required: item.required,
          validType: item.validType,
          width: item.width,
          maxlength: item.maxlength,
          minLength: item.minLength
        },
        required: item.required
      }
      activitySku.list.push(objectItem)
    })

    return activitySku
  },
  async toFiledItem () {},
  async toModel () {},
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
