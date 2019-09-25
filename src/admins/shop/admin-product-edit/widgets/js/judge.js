export default {
  // 操作信息判断
  operation (jsThis) {
    var aidutMessage =
      jsThis.viewModel.productDetail.productDetailExtension.aidutMessage
    return jsThis.rouerId && aidutMessage !== '' && aidutMessage !== null
  },
  // 保存按钮判断
  judgeSave (jsThis) {
    var productStatus = jsThis.viewModel.product.productStatus
    if (jsThis.rouerId) {
      // 3 管理员&& 1 审核状态 显示审核按钮
      if (jsThis.$base.filter() === 3 && productStatus === 1) {
        return false
      }
      //  3 管理员 && ！1 非审核状态 显示保存按钮
      if (jsThis.$base.filter() === 3 && productStatus !== 1) {
        return true
      }
      return jsThis.viewModel && productStatus !== 1
    }
    return true
  },
  // 审核按钮判断
  judgeExamine (jsThis) {
    return (
      jsThis.rouerId &&
      jsThis.viewModel.product.productStatus === 1 &&
      jsThis.$base.filter() === 3
    )
  },
  // 运费模板下拉列表是否禁用
  isSelect (jsThis) {
    return (
      jsThis.routeId &&
      jsThis.productView.product.storeId !== jsThis.productView.store.id
    )
  },
  // 运费模板添加按钮判断
  judgeFreight (jsThis) {
    var productStatus = jsThis.productView.product.productStatus
    if (jsThis.routeId) {
      return (
        jsThis.productView &&
        productStatus !== 1 &&
        jsThis.productView.product.storeId === jsThis.productView.store.id
      )
    }
    return true
  }
}
