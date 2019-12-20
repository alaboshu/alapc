import user from '@/service/prototypes/user'
import api from '@/service/prototypes/api'
import admin from '@/admins/admin/admin-layout/admin.js'
import Vue from 'vue'
export default {
  // 编辑菜单
  async editMenu (jsThis) {
    var widget = {
      name: 'admin-layout',
      widgetId: '5d1c19f7fd4f920e70f884c4',
      type: 'treeTable'
    }
    jsThis.$emit('editWidget', widget)
  },
  // Diy 编辑时候，菜单处理
  async diyLogin () {
    if (user.loginUser() === null) {
      window.location.href = '/admin/login'
    }
    var result = api.vuexLocalGet('adminRoleOutput')
    if (result) {
      this.appEnums('cache', result)
      return result
    }
    var response = await api.httpPost('Api/Employee/Login', user.loginUser())
    if (response.status === 1) {
      var roleOutput = admin.convertToMenus(response.result)
      // 处理菜单索引，以及是否显示左侧菜单
      this.appEnums('cache', roleOutput)
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
  }
}
