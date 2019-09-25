export default {
  // 根据选择的值生成sku,目前仅支持两个规格、一个Sku、三个sku
  createSkuList (jsThis) {
    var salePropertys = jsThis.productView.category.salePropertys
    var createSkuList = []
    // 一维数组，一个sku规格值
    if (salePropertys.length === 1) {
      for (var i = 0; i < salePropertys[0].propertyValues.length; i++) {
        var firstItem = salePropertys[0].propertyValues[i]
        if (firstItem.isCheck) {
          var specSn = firstItem.id + '|'
          var skuItem = this.getSkuItem(jsThis, specSn)
          skuItem.propertyValueDesc = this.getItemValue(firstItem)
          createSkuList.push(skuItem)
        }
      }
    }
    // 二维数组，两个sku规格值
    if (salePropertys.length === 2) {
      for (i = 0; i < salePropertys[0].propertyValues.length; i++) {
        firstItem = salePropertys[0].propertyValues[i]
        if (firstItem.isCheck) {
          for (var k = 0; k < salePropertys[1].propertyValues.length; k++) {
            var secondItem = salePropertys[1].propertyValues[k]
            if (secondItem.isCheck) {
              specSn = firstItem.id + '|' + secondItem.id + '|'
              skuItem = this.getSkuItem(jsThis, specSn, createSkuList)
              skuItem.propertyValueDesc = this.getItemValue(firstItem) + ' ' + this.getItemValue(secondItem)
              createSkuList.push(skuItem)
            }
          }
        }
      }
    }
    // 三维数组，两个sku规格值
    if (salePropertys.length === 3) {
      for (i = 0; i < salePropertys[0].propertyValues.length; i++) {
        firstItem = salePropertys[0].propertyValues[i]
        if (firstItem.isCheck) {
          for (k = 0; k < salePropertys[1].propertyValues.length; k++) {
            secondItem = salePropertys[1].propertyValues[k]
            if (secondItem.isCheck) {
              for (var t = 0; t < salePropertys[2].propertyValues.length; t++) {
                var thirdItem = salePropertys[2].propertyValues[t]
                if (thirdItem.isCheck) {
                  specSn = firstItem.id + '|' + secondItem.id + '|' + thirdItem.id + '|'
                  skuItem = this.getSkuItem(jsThis, specSn)
                  skuItem.propertyValueDesc =
                    this.getItemValue(firstItem) +
                    ' ' +
                    this.getItemValue(secondItem) +
                    ' ' +
                    this.getItemValue(thirdItem)

                  createSkuList.push(skuItem)
                }
              }
            }
          }
        }
      }
    }
    return createSkuList
  },
  getSkuItem (jsThis, specSn) {
    var productView = jsThis.productView
    var find = null
    jsThis.dataSkuList.forEach(element => {
      if (element.specSn === specSn) {
        find = element
      }
    })
    if (jsThis.productView.productSkus.length > 0) {
      jsThis.productView.productSkus.forEach(element => {
        if (element.specSn === specSn) {
          find = element
        }
      })
    }
    if (find === null) {
      var pageSkuLength = jsThis.productView.productSkus.length + 1
      var dataSkuLength = jsThis.dataSkuList.length + 1
      var maxId = pageSkuLength > dataSkuLength ? pageSkuLength : dataSkuLength
      find = {
        id: 0,
        propertyValueDesc: '',
        specSn: specSn,
        bn: productView.product.bn + '-' + maxId,
        price: productView.product.price,
        costPrice: productView.product.costPrice,
        manRunPrice: productView.product.price,
        marketPrice: productView.product.marketPrice,
        weight: productView.product.weight,
        stock: productView.product.stock,
        productStatus: 2
      }
    }
    // debugger
    return find
  },
  // 获取别名还是值
  getItemValue (valueItem) {
    if (valueItem.valueAlias) {
      return valueItem.valueAlias
    }
    if (valueItem.valueName) {
      return valueItem.valueName
    }
    return ''
  }
}
