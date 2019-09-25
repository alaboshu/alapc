export default {
  // 添加商品规格值
  async addCategoryPropertyValue (jsThis, item, customerSaleValue, index) {
    if (customerSaleValue !== null && customerSaleValue !== '') {
      jsThis.productView.category.salePropertys[index].selfDefineValue = ''
      var data = {
        propertyId: item.id,
        name: customerSaleValue
      }
      var respsone = await jsThis.$api.httpPost('Api/CategoryPropertyValue/Add', data)
      for (let list in jsThis.productView.category.salePropertys) {
        if (Number(list) === Number(index)) {
          jsThis.productView.category.salePropertys[list].propertyValues.push(respsone.result)
        }
      }
      jsThis.$crud.message(jsThis, respsone)
    } else {
      jsThis.$notify({
        title: '失败',
        message: '请输入内容',
        type: 'error',
        position: 'bottom-right'
      })
    }
  },
  judgeInput (jsThis, value, pIndex) {
    if (value && value.length > 8) {
      jsThis.$alert('最多输入8个字符')
      jsThis.productView.category.salePropertys[pIndex].selfDefineValue = ''
    }
    // eslint-disable-next-line
    // if (value && value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '') !== value) {
    //   jsThis.$alert('只能输入中文，英文，数字')
    // }
  }
}
