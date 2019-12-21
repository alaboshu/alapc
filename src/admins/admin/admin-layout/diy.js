
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
  diyMenus (diyMenus) {
    console.info('diyMenus diy.js', diyMenus)
    if (diyMenus) {
      var roleOutput = Vue.prototype.$admin.convertToMenus(diyMenus)
      return roleOutput
    }
  }
}

