export default {
  // 订单操作,订单和操作方式
  async action (jsThis, order, method) {
    if (method === 'AdminOrderPay') {
      this.userOrderPay(order)
    }
    if (method === 'AdminOrderCancle') {
      this.userOrderCancle(jsThis, order)
    }
    if (method === 'AdminOrderDelete') {
      this.userOrderDelete(jsThis, order)
    }
    if (method === 'OrderAdminDelivery') {
      this.userOrderSellerDelivery(jsThis, order)
    }
    if (method === 'OrderAdminChangeAddress') {
      this.userOrderAdminChangeAddress(jsThis, order)
    }
    if (method === 'OrderAdminPay') {
      this.userOrderSellerPay(jsThis, order)
    }
    if (method === 'UserOrderCheckLogistics') {
      this.userOrderCheckLogistics(jsThis, order)
    }
  },
  // 付款
  async userOrderPay (order) {},
  // 取消订单
  async userOrderCancle (jsThis, order) {
    if (!order.payPassword) {
      jsThis.$alert('密码不能为空')
      return
    }
    jsThis.TableEdit = false
    var data = {
      userId: order.userId,
      payPassword: order.payPassword,
      orderId: order.orderId
    }
    var response = await jsThis.$api.httpPost('/api/OrderAdmin/Cancel', data)
    jsThis.widget.payPassword = ''
    jsThis.$crud.message(response)
  },
  async userOrderDelete (jsThis, order) {
    if (!order.payPassword) {
      jsThis.$alert('密码不能为空')
      return
    }
    jsThis.TableEdit = false
    var data = {
      userId: order.userId,
      payPassword: order.payPassword,
      orderId: order.orderId
    }

    await jsThis.$api.httpPost('/api/OrderAdmin/Delete', data)
    jsThis.widget.payPassword = ''
  },
  //  代付
  async userOrderSellerPay (jsThis, order) {
    var response = await jsThis.$api.httpPost('/Api/OrderAdmin/Pay ', order)
    if (response.status === 1) {

    }
  },
  // 发货
  async userOrderSellerDelivery (jsThis, order) {
    var response = await jsThis.$api.httpPost('api/order/Delivery', order)
    if (response.status === 1) {
      const loading = jsThis.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
        location.href = window.location.href
      }, 2000)
    } else {
      jsThis.$notify({
        title: '警告',
        message: response.message,
        type: 'warning',
        position: 'bottom-right'
      })
    }
  },
  // 查询物流
  async userOrderCheckLogistics (jsThis, order) {
    var response = await jsThis.$api.httpGet('Api/order/GetExpressInfo', order)
    if (response.status === 1) {
      return JSON.parse(response.message)
    } else {
      this.$notify({
        title: '警告',
        message: response.message,
        type: 'warning',
        position: 'bottom-right'
      })
    }
  },
  // 修改地址
  async userOrderAdminChangeAddress (jsThis, order) {
    await jsThis.$api.httpPost('/Api/OrderAdmin/Address', order)
  },
  OrderStatus (status) {
    var keyValue = [{
        'key': 1,
        'value': '待付款'
      },
      {
        key: 2,
        value: '待发货'
      },
      {
        key: 3,
        value: '待收货'
      },
      {
        key: 4,
        value: '待评价'
      },
      {
        key: 10,
        value: '待分享'
      },
      {
        key: 50,
        value: '退款/售后'
      },
      {
        key: 100,
        value: '已完成'
      },
      {
        key: 200,
        value: '已关闭'
      },
      {
        key: 201,
        value: '订单关闭，已退款'
      }
    ]

    var returnStatus
    keyValue.forEach(value => {
      if (value.key === status) {
        returnStatus = value.value
      }
    })
    return returnStatus
  }
}
