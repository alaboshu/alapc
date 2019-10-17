export default {
  async save(jsThis) {
    var viewModel = jsThis.viewModel || jsThis.productView
    var response = await jsThis.$api.httpPost('/Api/Category/Save', viewModel)
    if (response.status === 1) {
      jsThis.$notify({
        title: '操作成功',
        type: 'success',
        // message: response.message,
        position: 'bottom-right'
      })
    } else {
      jsThis.$notify({
        title: '操作失败',
        type: 'error',
        message: response.message,
        position: 'bottom-right'
      })
    }
  },
  // 销售属性
  createSkuList(jsThis) {
    var productView = jsThis.productView.salePropertys
    var createSkuList = []
    if (productView.length > 0) {
      for (let i = 0; i < productView.length; i++) {
        for (let j = 0; j < productView[i].values.length; j++) {
          var list = this.listData(productView[i].name, productView[i].values[j])
          createSkuList.push(list)
        }
      }
    }
    return createSkuList
  },
  // 商品属性
  displayPropertyList(jsThis) {
    var productView = jsThis.productView.displayPropertys
    var createSkuList = []
    if (productView.length > 0) {
      for (let i = 0; i < productView.length; i++) {
        for (let j = 0; j < productView[i].values.length; j++) {
          var list = this.listData(productView[i].name, productView[i].values[j], productView[i].controlsType)
          createSkuList.push(list)
        }
      }
    }
    return createSkuList
  },
  listData(name, list, type) {
    list = {
      name,
      id: list.id,
      valueName: list.valueName
    }
    if (type !== null) {
      list.controlsType = type
    }
    return list
  },
  // 删除
  handleDelete(jsThis, index, val) {
    for (let i of jsThis.productView.displayPropertys) {
      for (let j in i.values) {
        if (i.values[j].id === val.id) {
          i.values.splice(j, 1)
          jsThis.$notify({
            title: '成功',
            message: '删除成功',
            position: 'bottom-right',
            type: 'success'
          })
        }
      }
    }
  },
  // 输入框非空验证
  input() {

  }
}
