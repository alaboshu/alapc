export default {
  handleDelete (jsThis, index, val) {
    if (jsThis.displayPropertys.length === 1) {
      jsThis.$alert('商品属性至少一个，最多三个')
      return
    }
    jsThis.$confirm('是否删除？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      jsThis.displayPropertys.splice(index, 1)
    }).catch(() => {})
  },
  async commodityEdit (jsThis) {
    jsThis.tableList = {
      id: '00000000-0000-0000-0000-000000000000',
      name: '',
      intro: '',
      controlsType: 4,
      sortOrder: '',
      values: [{
          id: '00000000-0000-0000-0000-000000000000',
          valueName: ''
        }, {
          id: '00000000-0000-0000-0000-000000000000',
          valueName: ''
        },
        {
          id: '00000000-0000-0000-0000-000000000000',
          valueName: ''
        }
      ]
    }
  },
  save (jsThis) {
    if (jsThis.tableList.name === '') {
      jsThis.$alert('名称不能为空')
      return
    }
    for (let i of jsThis.tableList.values) {
      if (i.valueName === '') {
        jsThis.$alert('属性值不能为空')
        return
      }
    }
    jsThis.dialogVisible = false
    var list = []
    for (let item of jsThis.tableList.values) {
      list.push(item.valueName)
    }
    jsThis.tableList.intro = list.join(',')
    for (let i in jsThis.displayPropertys) {
      if (String(i) === String(jsThis.listInde)) {
        jsThis.displayPropertys.splice(i, 1, jsThis.tableList)
        jsThis.listInde = ''
        return
      }
    }
    jsThis.displayPropertys.push(jsThis.tableList)
  }
}
