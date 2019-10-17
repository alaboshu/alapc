export default {
  handleDelete (jsThis, index, val) {
    if (jsThis.salePropertys.length === 1) {
      jsThis.$alert('销售属性至少一个，最多三个')
      return
    }
    jsThis.$confirm('是否删除？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      jsThis.salePropertys.splice(index, 1)
    }).catch(() => {})
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
    for (let i in jsThis.salePropertys) {
      if (String(i) === String(jsThis.listIndex)) {
        jsThis.salePropertys.splice(i, 1, jsThis.tableList)
        jsThis.listIndex = ''
        return
      }
    }
    jsThis.salePropertys.push(jsThis.tableList)
  },
  saleEdit (jsThis) {
    if (jsThis.salePropertys.length < 3) {
      jsThis.dialogVisible = true
      jsThis.tableList = {
        id: '00000000-0000-0000-0000-000000000000',
        name: '',
        intro: '',
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
    } else {
      jsThis.$alert('最多添加三个销售属性').then(() => {}).catch(() => {})
    }
  }
}
