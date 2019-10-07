import base from '@/service/prototypes/base'
import api from '@/service/prototypes/api'
import user from '@/service/prototypes/user'
import json from './widget.json'
import Vue from 'vue'

export default {
  // 检查后台管理员权限
  async checkAdminRole (pageInfo) {
    await base.setTitle(pageInfo.name)
    var roleOutput = api.vuexLocalGet('adminRoleOutput')
    if (roleOutput === null) {
      user.loginOut()
      Vue.prototype.$alert('登录已失效,请重新登录')
      window.location.href = '/admin/login'
    }
    roleOutput.allRoleIds.indexOf(pageInfo.id)
  },
  setWidget (jsThis) {
    var widget = json
    widget.path = jsThis.$route.path
    widget.url = jsThis.$route.path
    if (jsThis.$route.path.toLowerCase().endsWith('list')) {
      var type = this.getType(jsThis, 'list')
      widget.widgets[0].value.table.type = type
      widget.widgets[0].componentPath = '/auto/admin-auto-table'
      widget.widgets[0].name = 'admin-auto-table'
      return widget
    } else if (jsThis.$route.path.toLowerCase().endsWith('edit')) {
      type = this.getType(jsThis, 'edit')
      widget.widgets[0].value.type = type
      widget.widgets[0].componentPath = '/auto/admin-auto-form'
      widget.widgets[0].name = 'admin-auto-form'
      return widget
    }
    return null
  },
  getType (jsThis, type) {
    var setType = jsThis.$route.path.toLowerCase()
    if (jsThis.$route.path.toLowerCase().indexOf(type) !== -1) {
      setType = setType.replace('admin/', '')
      setType = setType.replace(type, '')
      setType = setType.replace('/', '')
      setType = setType.replace('/', '')
    }
    return setType
  }
}
