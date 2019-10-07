import api from '@/service/prototypes/api'
import help from '@/service/utils/helper'
import enumy from '@/service/data/enum.json'
import config from '@/service/config'
import router from '@/service/router'

export default {
  // 当前访问的路由信息
  router () {
    return router.history.current
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
  getEnumText (enumType, value) {
    for (let item of enumy) {
      if (item.name === enumType) {
        for (let list of item.keyValue) {
          if (list.key === value) {
            return list.value
          }
        }
      }
    }
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
    var apiUrl = api.baseUrl() + '/api/common/upload'
    return apiUrl
  },
  // 基本信息
  async site () {
    var site = api.vuexLocalGet('site_default')
    if (!site) {
      var response = await api.httpGet('/Api/Tenant/QueryDefault')
      if (response.status === 1) {
        site = response.result
        api.vuexLocalSet('site_default', site)
      }
    }
    return site
  },
  // 设置标题
  async setTitle (title) {
    var site = await this.site()
    var name = ''
    if (title) {
      name = title
    }
    document.title = `${name}--${site.site.companyName}  阿拉伯数提供技术支持`
  }
}
