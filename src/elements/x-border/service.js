import api from '@/service/prototypes/api'

export default {
  // 根据当前访问路径获取图标
  getAdminIcon () {
    var currentMenu = api.vuexLocalGet('admin_current_menu')
    if (currentMenu === undefined) {
      return 'el-icon-s-operation'
    }
    if (currentMenu.icon.includes('icon-')) {
      return currentMenu.icon
    } else {
      var roleOutput = api.vuexLocalGet('adminRoleOutput')
      var oneMenu = roleOutput.menus[currentMenu.oneIndex]
      return oneMenu.icon
    }
  }
}
