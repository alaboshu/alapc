import api from '@/service/prototypes/api'
import help from '@/service/utils/helper'
import config from '@/service/config'
import router from '@/service/router'

export default {
  // 在系统启动时提前加载默认启动数据
  // 包括枚举、地址等数据
  // 当前访问的路由信息
  router () {
    return router.history.current
  },
  route () {
    return router()
  },
  // 使用路由的方式推送链接
  push (url) {
    router.push(url)
  },
  // 权限类型 All=1:无权限，匿名，谁都可以访问   User = 2 会员级别 Admin = 3 管理员级别
  //  Store = 4 供应商级别 Offline = 5 线下店铺 City = 6 城市合伙人  营销中心 Market = 101
  filter () {
    var filter = this.router().meta.filter
    if (filter) {
      return filter
    } else {
      return 0
    }
  },
  // 判断是生成环境还是开发环境
  isBuild () {
    if (process.env.NODE_ENV === 'development') {
      return false
    } else {
      return true
    }
  },
  // 判断是生成环境还是开发环境
  clientHost () {
    return config.apiBaseUrl
  },

  // 获取枚举中的文字
  enumText (enumType, value) {
    if (!enumType) {
      return value
    }
    var enumFind = this.getEnum(enumType)
    var itemValue = enumFind.keyValue.find(item => item.key === value)
    if (itemValue) {
      return itemValue.value
    }
    return value
  },
  // 获取枚举数据
  getEnum (enumType) {
    var allEnums = this.getAllEnums()
    if (!enumType) {
      return
    }
    var find = allEnums.find(
      item => item.name.toLowerCase() === enumType.toLowerCase()
    )
    if (find) {
      return find
    }
  },
  // 获取枚举中的文字
  enumValue (enumType, value) {
    if (!enumType) {
      return value
    }
    var enumFind = this.getEnum(enumType)
    if (enumFind) {
      var itemValue = enumFind.keyValue.find(item => item.key === value)
      return itemValue
    }
  },
  // 系统所有的枚举
  getAllEnums () {
    var allEnums = api.vuexLocalGet('all_enums_keyvalues')
    if (!allEnums) {
      api.httpGet('/api/type/AllEnums').then(response => {
        if (response.status === 1) {
          api.vuexLocalSet('all_enums_keyvalues', response.result)
        }
      })
    }
    allEnums = api.vuexLocalGet('all_enums_keyvalues')
    return allEnums
  },
  isDiy () {
    if (process.env.ZK_DIY === 'true') {
      return true
    } else {
      return false
    }
  },
  diy (widget) {
    if (this.isDiy() && !help.isEmpty(widget)) {
      var diyWidget = {
        'component-path': widget.componentPath,
        'data-id': widget.dataId,
        'widget-id': widget.widgetId
      }
      return diyWidget
    }
    return null
  },
  // 当前页面的完整路径
  fullPath () {
    var fullPath = location.href
    return fullPath
  },
  // 实际页面路径
  path (option) {
    var path = option.fullPath
    if (api.isEmpty(path)) {
      path = '/index'
    }
    if (path === '/') {
      path = '/index'
    }
    path = path.replace('pages/', '')
    path = path.replace('/pages', '')
    path = path.replace('/views', '')
    path = path.replace('views/', '')
    var index = path.indexOf('?')
    if (index > 0) {
      path = path.substr(0, index)
    }
    return path
  },
  // 客户端服务器地址，上传图片地址
  clientUploadApi () {
    var apiUrl = api.baseUrl() + '/api/StorageFile/upload'
    return apiUrl
  },
  // 基本信息
  async siteAsync () {
    var site = api.vuexLocalGet('site_default')
    if (!site) {
      var response = await api.httpGet('/Api/Tenant/QueryDefault')
      if (response.status === 1) {
        site = response.result
        api.vuexLocalSet('site_default', site)
      }
    }
    return site.site
  },
  // 基本信息
  site () {
    var site = api.vuexLocalGet('site_default')
    return site.site
  },
  // 设置标题
  async setTitle (title) {
    var site = await this.site()
    var name = ''
    if (title) {
      name = title
    }
    document.title = `${name}--${site.companyName}  阿拉博数提供技术支持`
  }
}
