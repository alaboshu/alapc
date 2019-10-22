import action from '../action'

export default {
  // 区分显示哪个弹窗按钮，进行不同功能操作
  async getDialog (jsThis, method) {
    jsThis.editMethod = method
    if (method === 'UserOrderCheckLogistics') {
      let par = {
        orderId: jsThis.viewModel.id
      }
      var checkLogistics = await action.userOrderCheckLogistics(jsThis, par)

      jsThis.LogisticsMessage = checkLogistics.result.list
      jsThis.checkLogistics = true
    } else {
      jsThis.TableEdit = true
      jsThis.$nextTick(function () {
        jsThis.$refs.from_item.changeover(method)
      })
    }
  },
  // 区分请求接口
  async saveTableData (jsThis) {
    var user = jsThis.$refs.from_item.user
    var fromItem = jsThis.$refs.from_item
    let paramenter = {}
    var dataGet = {
      orderId: jsThis.viewModel.order.id
    }
    if (jsThis.$refs.from_item.currt === 'OrderAdminDelivery') {
      paramenter.OrderId = jsThis.viewModel.id
    }
    if (jsThis.$refs.from_item.currt === 'OrderAdminChangeAddress') {
      paramenter.RegionId = user.regionId
      paramenter.Address = user.address
      paramenter.Mobile = user.mobile
      paramenter.Name = user.name
      paramenter.OrderId = jsThis.viewModel.id
    }
    if (jsThis.$refs.from_item.currt === 'OrderAdminRemark') {
      paramenter.OrderId = jsThis.viewModel.id
    }
    if (jsThis.$refs.from_item.currt === 'OrderAdminPay') {
      paramenter.PayPassword = user.password
      paramenter.PaymentAmount = user.PaymentAmount
      paramenter.OrderId = jsThis.viewModel.id
      paramenter.UserId = jsThis.$user.id()
    }
    if (jsThis.$refs.from_item.currt === 'UpdateExpressAmount') {
      var data = jsThis.$refs.from_item.freightData
      data.userId = jsThis.$user.id()
      var res = await jsThis.$api.httpPost('Api/Order/UpdateExpressAmount', data)
      jsThis.$crud.message(jsThis, res)
    }
    if (jsThis.$refs.from_item.currt === 'Api/Refund/Process') {
      var refundData = {
        productId: jsThis.viewModel.productSkuItems[0].productId,
        storeId: jsThis.viewModel.storeId,
        userId: jsThis.viewModel.userId,
        orderId: jsThis.viewModel.order.id,
        address: fromItem.refund.address,
        amount: Number(fromItem.refund.amount),
        processMessage: fromItem.refund.processMessage
      }
      var refundRes = await jsThis.$api.httpPost('api/refund/process', refundData)
      jsThis.$crud.message(jsThis, refundRes)
    }
    if (jsThis.$refs.from_item.currt === 'AdminAllowRefund') {
      dataGet.address = jsThis.$refs.from_item.returnAddress
      var AllowProcess = await jsThis.$api.httpPost('api/refund/AllowProcess', dataGet)
      jsThis.$crud.message(jsThis, AllowProcess)
    }
    if (jsThis.$refs.from_item.currt === 'AdminRefuseRefund') {
      dataGet.processMessage = jsThis.$refs.from_item.processMessage
      var RefuseProcess = await jsThis.$api.httpPost('api/refund/RefuseProcess', dataGet)
      jsThis.$crud.message(jsThis, RefuseProcess)
    }
    if (jsThis.$refs.from_item.currt === 'AdminPayment') {
      dataGet.icertificate = jsThis.$refs.from_item.adminPayment.icertificate
      dataGet.desc = jsThis.$refs.from_item.adminPayment.desc
      var PayGoodsAmount = await jsThis.$api.httpPost('Api/Order/PayGoodsAmount', dataGet)
      jsThis.$crud.message(jsThis, PayGoodsAmount)
    }
    if (jsThis.$refs.from_item.currt === 'Api/OrderAdmin/AdminCancel') {
      var adminCoseData = {
        orderId: jsThis.viewModel.order.id,
        userId: jsThis.$user.id(),
        payPassword: fromItem.user.password
      }
      var adminCose = await jsThis.$api.httpPost('Api/OrderAdmin/Cancel', adminCoseData)
      if (adminCose.status === 1) {
        jsThis.$notify({
          title: '关闭成功',
          message: '订单已关闭',
          position: 'bottom-right'
        })
      } else {
        jsThis.$notify({
          title: '关闭失败',
          message: adminCose.message,
          position: 'bottom-right'
        })
      }
    }
    action.action(jsThis, paramenter, jsThis.$refs.from_item.currt)
  },
  // 增加快递方式
  async increaseDelivery (jsThis) {
    var user = jsThis.$refs.from_item.user
    let paramenter = {}
    paramenter.ExpressNum = user.logistics
    paramenter.ExpressNo = user.ExpressNo
    paramenter.ExpressName = user.ExpressName
    paramenter.OrderId = jsThis.viewModel.id
    paramenter.StoreId = jsThis.viewModel.storeId
    paramenter.UserId = jsThis.$user.loginUser().id
    paramenter.Name = user.name
    paramenter.Address = user.address
    paramenter.RegionId = user.regionId
    paramenter.UserName = jsThis.viewModel.order.orderExtension.user.userName
    paramenter.remark = user.remark
    var respom = await jsThis.$api.httpPost('api/order/AddExpress', paramenter)
    if (respom.status === 1) {
      jsThis.$refs.from_item.deliveryList()
      jsThis.$refs.from_item.user.logistics = ''
      jsThis.$refs.from_item.user.remark = ''
    } else {
      jsThis.$notify.error({
        title: '错误',
        message: respom.message,
        position: 'bottom-right'

      })
    }
  }
}
