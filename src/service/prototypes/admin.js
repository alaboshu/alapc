import api from '@/service/prototypes/api'
import base from '@/service/prototypes/base'
import user from '@/service/prototypes/user'

import Vue from 'vue'
export default {
  // 员工登录，验证权限的同时访问菜单
  async employeeLogin () {
    if (user.loginUser() === null) {
      window.location.href = '/admin/login'
    }
    var result = api.vuexLocalGet('adminRoleOutput')
    if (result) {
      return result
    }
    var response = await api.httpPost('Api/Employee/Login', user.loginUser())
    if (response.status === 1) {
      var roleOutput = response.result

      // 处理菜单索引，以及是否显示左侧菜单
      roleOutput.menus.forEach((element, index) => {
        var showChildMenu = false
        var asideWidth = '92px'
        if (element.menus && element.menus.length > 0) {
          showChildMenu = true
          asideWidth = '200px'
        }
        element.oneIndex = index
        element.twoIndex = 0
        element.threeIndex = 0
        element.showChildMenu = showChildMenu
        element.asideWidth = asideWidth
        if (element.menus) {
          element.menus.forEach((twoMenu, twoIndex) => {
            twoMenu.oneIndex = index
            twoMenu.twoIndex = twoIndex
            twoMenu.threeIndex = 0
            twoMenu.open = false
            if (twoIndex === 0) {
              twoMenu.open = true
            }
            twoMenu.showChildMenu = showChildMenu
            twoMenu.asideWidth = asideWidth
            if (twoMenu.menus) {
              twoMenu.menus.forEach((threeMenu, threeIndex) => {
                threeMenu.oneIndex = index
                threeMenu.twoIndex = twoIndex
                threeMenu.threeIndex = threeIndex
                threeMenu.showChildMenu = showChildMenu
                threeMenu.asideWidth = asideWidth
              })
            }
          })
        }
      })
      api.vuexLocalSet('adminRoleOutput', roleOutput)
      return roleOutput
    } else {
      Vue.prototype.$notify({
        title: '操作失败',
        type: 'error',
        message: response.message,
        position: 'bottom-right'
      })
      user.loginOut()
      return null
    }
  },
  // 后台管理提示
  message (message, type, title) {
    var messageType = 'success'
    if (type) {
      messageType = type
    }
    var data = {
      name: 'admin-message',
      message: message,
      title: title,
      type: messageType
    }
    Vue.prototype.$bus.$emit('autoDialogEvent', data)
  },
  // 跳转,并记录Url链接地址到换成
  to (item, isDiy = false) {
    if (!item || !item.id || !item.name || !item.url) {
      return
    }
    var list = api.vuexLocalGet('admin_browsing_history')
    if (list) {
      var isExist = false
      for (var i = 0; i < list.length; i++) {
        var element = list[i]
        if (element.name === item.name) {
          isExist = true
          break
        }
      }
      if (isExist) {
        list = list.filter(r => r.id !== item.id)
      }
      if (!isExist) {
        list.unshift(item)
        if (list.length > 10) {
          list.pop()
        }
      }
    } else {
      list = []
      list.unshift(item)
    }
    api.vuexLocalSet('admin_browsing_history', list)
    if (item && item.id && item.name && item.url) {
      api.vuexLocalSet('admin_current_menu', item)
    }
    if (isDiy) {
      Vue.prototype.$bus.$emit('diyEditMenuJump', item.url)
    } else {
      base.push(item.url)
    }
  }
}
