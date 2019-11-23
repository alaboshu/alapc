import http from '@/service/core/http'
import api from '@/service/prototypes/api'
import base from '@/service/prototypes/base'
import user from '../prototypes/user'

export default {
  // 页面信息
  async page (option, type) {
    var path = base.path(option)
    var pageInfo = await this.getPageInfo(path, type, option)
    if (pageInfo === undefined || pageInfo === null) {
      return
    }
    pageInfo = this.filerPageInfo(pageInfo, option)
    return pageInfo
  },

  // 过滤页面信息
  filerPageInfo (pageInfo, option) {
    var widgets = []
    if (pageInfo.widgets !== null) {
      for (var i = 0; i < pageInfo.widgets.length; i++) {
        var widgetItem = pageInfo.widgets[i]
        widgetItem.route = option
        widgets.push(widgetItem)
      }
      if (!pageInfo.setting) {
        pageInfo.setting = {}
      }
      pageInfo.widgets = widgets
    }
    // if (pageInfo.widgets === null) {
    //   return pageInfo
    // }
    // var filterWidgets
    // if (pageInfo.layout !== 0) {
    //   filterWidgets = pageInfo.widgets.filter(
    //     element => element.layout === pageInfo.layout
    //   )
    // } else {
    //   filterWidgets = pageInfo.widgets
    // }
    pageInfo.widgets = this.filterWidgets(pageInfo.widgets)
    var setting = pageInfo.setting
    // 登录信息判断
    if (setting && setting.isLogin !== false) {
      user.checkLogin(setting.isLogin)
    }
    return pageInfo
  },

  // 模块信息,para 为附加参数
  async widget (widget, appendPara) {
    if (widget) {
      return widget.value
    }
  },
  // 处理widgets
  filterWidgets (widgets) {
    if (widgets === null || widgets === undefined) {
      return null
    }
    widgets.forEach(element => {
      element.border = null
      if (element.style) {
        if (element.style.border) {
          var styleBorder = JSON.parse(element.style.border)
          element.border = styleBorder
          if (element.border.name && element.border.name.length > 0) {
            element.border.show = true
          }
        }
      }
      if (!element.border) {
        element.border = {}
        element.border.show = false
      }

      if (api.isEmpty(element.layout)) {
        element.layout = null
      } else {
        if (element.value) {
          if (typeof element.value !== 'object') {
            element.value = JSON.parse(element.value)
          }
        }
      }
      // 判断element.value 的类型为object时不在系列化
      if (element.value && typeof element.value !== 'object') {
        element.value = JSON.parse(element.value)
      }
    })
    return widgets
  },
  // 获取值
  async getWidgetValueByApiUrl (parameter, para) {
    if (parameter.apiUrl !== undefined) {
      var response = await http.get(parameter.apiUrl, para)
      parameter.value = response
    }
    return parameter
  },
  // 当前访问的页面
  async getPageInfo (path, type) {
    var allPageInfo = await this.getAllPageList(type)
    var findPageInfo = null
    if (allPageInfo !== undefined && allPageInfo != null) {
      for (var i = 0; i < allPageInfo.pageList.length; i++) {
        var element = allPageInfo.pageList[i]
        if (
          path
          .substring(0, 6)
          .toLowerCase()
          .indexOf('admin') !== -1 &&
          type !== undefined
        ) {
          if (path.toLowerCase() === element.path.toLowerCase()) {
            findPageInfo = element
            break
          }
        } else {
          if (element.path === path) {
            findPageInfo = element
            break
          }
        }
      }
    }
    return findPageInfo
  },
  // 所有页面记录，并写入缓存 type类型：Front，Admin，Store，City等和后台对应
  async getAllPageList (type) {
    var para = {
      clientType: api.client()
    }
    var allPageCacheKey
    if (type === undefined) {
      allPageCacheKey = 'allPageInfo_' + '__' + api.client()
    } else {
      allPageCacheKey = 'allPageInfo_' + type + '__' + api.client()
    }
    var allPageInfo = api.vuexLocalGet(allPageCacheKey)
    var isRequest = true // 是否重新请求
    if (!api.isEmpty(allPageInfo)) {
      let timestamp = Math.round(new Date().getTime() / 1000)
      if (allPageInfo.lastUpdate > timestamp) {
        isRequest = false
      }
    }
    if (isRequest) {
      if (type !== undefined) {
        para = {
          ...para,
          type: type
        }
      }
      var response = await http.get('Api/Theme/GetAllClientPages', para)
      api.vuexSet(allPageCacheKey, response.result)
      api.localSet(allPageCacheKey, response.result)
      allPageInfo = response.result
    }
    return allPageInfo
  }
}
