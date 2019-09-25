export default {
  // 编辑菜单
  async editMenu (jsThis) {
    var widget = {
      name: 'admin-layout',
      widgetId: '5d1c19f7fd4f920e70f884c4',
      type: 'treeTable'
    }
    jsThis.$emit('editWidget', widget)
  }
}
