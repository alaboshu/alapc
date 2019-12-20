<template>
  <div>
    <zk-product-top></zk-product-top>
    <div class="zk-buy">
      <div class="order-head">
        <div class="head-logo">
          <img src="//upload-images.jianshu.io/upload_images/15475986-4a8aec0d4e216f89.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp" alt="">
        </div>
        <div class="head-steps ">
          <div class="steps-box">
            <el-steps :space="200" :active="num">
              <el-step title="拍下商品"></el-step>
              <el-step title="付款"></el-step>
              <el-step title="确认收货"></el-step>
              <el-step title="评价"></el-step>
            </el-steps>
          </div>
        </div>
      </div>
      <!-- 收货地址 -->
      <div class="order-address" v-if="asyncFlag">
        <h2>选择收货地址</h2>
        <div class="list" v-if="addressList">
          <div class="addr " v-for="(address,addressIndex) in addressList" :key="addressIndex" @click="orderAddress(address, addressIndex)">
            <div class="default" v-if="address.isDefault">默认地址 </div>
            <div class="default_edit" @click="editAddress(address)">编辑</div>
            <div class="inner " :class="{'active':address.isDefault}">
              <div class="addr-hd">
                <span>{{address.addressDescription}}</span> ({{address.name}}收)
              </div>
              <div class="addr-bd">
                {{address.address}}
              </div>
            </div>
          </div>
        </div>
        <div class="control" v-if="addressList.length< 1">
          <div class="add">
            <el-button type="primary" size="mini" @click="dialogFormVisible=true">使用新地址</el-button>
          </div>
        </div>
      </div>
      <el-dialog v-if="asyncFlag" title="添加收货地址" :visible.sync="dialogFormVisible">
        <zk-address-edit v-if="dialogFormVisible" :actionType="actionType" :addressItem="addressItem" @addressAdd="newAdd"></zk-address-edit>
      </el-dialog>
      <div v-if="asyncFlag">
        <div v-for="(item,index) in viewModel.storeItems" :key="index">
          <div class="order-dssc">
            <div class="buy-title" @click="(num++)">确认订单信息</div>
            <div class="buy-th">
              <div class="buy-td td-0">店铺宝贝</div>
              <div class="buy-td td-1">商品属性</div>
              <div class="buy-td td-2">单价</div>
              <div class="buy-td td-3">数量</div>
              <div class="buy-td td-4">优惠方式</div>
              <div class="buy-td td-5">小计</div>
            </div>
          </div>
          <div class="order-box">
            <div class="order-info">
              店铺：{{item.storeName}}
            </div>
            <div class="order-item" v-for="(t,i) in item.productSkuItems" :key="i">
              <div class="order-item-info">
                <div class="info-detail info-cell">
                  <div class="info-cell">
                    <img class="info-img" :src="t.thumbnailUrl" alt="">
                  </div>
                  <div class="info-cell info-msg">
                    <div class="info-title">
                      {{t.name}}
                    </div>
                  </div>
                </div>
                <div class="info-sku info-cell">
                  <p>{{t.propertyValueDesc}}</p>
                </div>
                <div class="info-price info-cell">
                  {{t.displayPrice}}
                </div>
              </div>
              <div class="order-quantity">
                ×{{t.buyCount}}
              </div>
              <div class="order-promotion">

              </div>
              <div class="order-itemPay">
                {{t.displayPrice}}
              </div>
            </div>
            <div class="order-orderExt">
              <!-- <div class="order-extUser">
                <div class="order-invoice">
                  <div class="invoice-box">
                    <div class="invoice-title">

                    </div>
                    <div class="invoice-operate">
                      <div class="invoice-type">
                        <div class="title-label">
                          发票类型：
                        </div>
                        <div>电子发票</div>
                      </div>
                      <div class="invoice-info">
                        <div class="title-label">
                          发票信息：
                        </div>
                        <div>
                        </div>
                      </div>
                      <div class="invoice-info">
                        <div class="title-label">
                          发票抬头类型：
                        </div>
                        <div>
                        </div>
                      </div>
                      <div class="invoice-info">
                        <div class="title-label">
                          发票抬头：
                        </div>
                        <div> <input type="text" value="个人"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="order-memo">
                  <div class="memo-label">
                    给卖家留言：
                  </div>
                  <div>
                    <input type="text">
                  </div>
                </div>
              </div> -->
              <div class="order-extInfo" v-if="storePrices[index]">
                <div class="order-promotion">
                  <div class="shop-promotion-title">
                    会员优惠({{gardeName}}):
                  </div>
                  <div class="shop-promotion-selecter">
                  </div>
                  <div class="shop-promotion-discount">-￥{{storePrices[index].memberDiscountAmount}}</div>
                </div>
                <!-- <div class="order-deliveryMethod">
                  <div class="delivery-title">运送方式:</div>
                  <div class="delivery-select">
                    <el-select v-model="showDelivery[index]" placeholder="请选择" size="mini">
                      <el-option v-for="item in showDeliveryTyoe[0]" :key="item.value" :label="item.label" :value="item.value" @change="deliveryChange">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="delivery-price">
                    0.00
                  </div>
                </div> -->
                <div class="order-postageInsurance">
                  <div class="user-title">商品总价:</div>
                  <div class="user-operate"></div>
                  <div class="user-price">{{(storePrices[index].totalAmount - storePrices[index].expressAmount).toFixed(2)}}</div>
                </div>
                <div class="order-postageInsurance">
                  <div class="user-title">运费：</div>
                  <div class="user-operate"></div>
                  <div class="user-price">￥{{storePrices[index].expressAmount }}</div>
                </div>
                <div class="order-postageInsurance">
                  <div class="user-title">实付款</div>
                  <div class="user-operate"></div>
                  <div class="user-price">￥{{storePrices[index].totalAmount}}</div>
                </div>
              </div>
            </div>
            <div class="order-pay" v-if="storePrices[index]">
              <div>店铺合计(含运费{{storePrices[index].expressAmount}})：</div>
              <div class="pay-price">￥{{storePrices[index].totalAmount}}</div>
            </div>
          </div>
        </div>
        <div class="order-payInfo">
          <div class="payInfo-wrapper">
            <div class="payInfo-shadow">
              <div class="order-realPay">
                <div class="realPay-title">实付款：</div>
                <div class="order-price">￥</div>
                <div class="realPay-price">{{priceView.totalAmount}}</div>
              </div>
              <div class="order-confirmAddr" style="display:flex">
                <span class="confirmAddr-title">
                  寄送至：
                </span>
                <div>
                  <span class="confirmAddr-addr-bd">
                    <span>{{addressMsg.addressDescription}}</span>
                    <span class="confirAddr-address"> {{addressMsg.address}}</span>
                  </span>
                </div>
              </div>
              <div class="order-confirmAddr-user">
                <span class="confirmAddr-title">收货人：</span>
                <span class="confirmAddr-content">{{addressMsg.name}}{{addressMsg.mobile}}</span>
              </div>
            </div>
          </div>
          <div class="order-submitOrder">
            <div class="wrapper" @click="buy()">
              提交订单
            </div>
          </div>
        </div>
      </div>
      <zk-pay ref="show_pay"></zk-pay>
    </div>
  </div>
</template>

<script>
  export default {

    data () {
      return {
        asyncFlag: false,
        addressMsg: '',
        addressId: '',
        addressList: '',
        isFromCart: false, // 是否来自购物车
        isFromOrder: false, // 是否来自订货页面
        showDeliveryTyoe: [], // 显示物流快递
        showDelivery: [], // 选择的物流快递方式
        showDeliveryName: [],
        userMessages: [], // 卖家留言
        priceView: '', // 价格显示模型
        storePrices: [], // 店铺价格显示
        disBtn: true,
        value: '',
        dialogFormVisible: false,
        num: 1,
        gardeName: '',
        addressItem: '', // 编辑地址
        actionType: ''
      }
    },
    props: {
    },
    async onShow () {
      this.init()
    },
    created () {
      this.single()
    },
    mounted () {
      this.address()
      this.init()
    },
    methods: {
      async  init () {
        this.gardeName = this.$user.loginUser().gradeName
        var buyProductInfo = this.$api.localGet('buyProductInfo')
        if (this.$api.isEmpty(buyProductInfo)) {
          this.$message.warning('暂无商品，清先购买商品')
        }
        if (!this.$api.isEmpty(buyProductInfo.isFromCart)) {
          this.isFromCart = buyProductInfo.isFromCart
        }
        if (!this.$api.isEmpty(buyProductInfo.isFromOrder)) {
          this.isFromOrder = buyProductInfo.isFromOrder
        }
        var buyInfoInput = {
          loginUserId: this.$user.id(),
          productJson: JSON.stringify(buyProductInfo)
        }
        var initResponse = await this.$api.httpPost('/api/order/buyinfo', buyInfoInput)
        if (initResponse.status === 1) {
          this.viewModel = initResponse.result
          for (var i = 0; i < this.viewModel.storeItems.length; i++) {
            this.showDeliveryTyoe[i] = {}
            this.showDelivery[i] = {}
            this.showDeliveryName[i] = []
            this.userMessages[i] = '' // 初始化留言信息
            for (var io = 0; io < this.viewModel.storeItems[i].expressTemplates.length; io++) {
              var a = {
                label: this.viewModel.storeItems[i].expressTemplates[io].value,
                value: this.viewModel.storeItems[i].expressTemplates[io].key
              }
              this.showDeliveryTyoe[i][io] = a
              if (io === 0) {
                this.showDelivery[i] = this.viewModel.storeItems[i].expressTemplates[io].key
                this.showDeliveryName[i] = this.viewModel.storeItems[i].expressTemplates[io].value
              }
            }
          }
          for (var k = 0; k < this.viewModel.allowMoneys.length; k++) {
            this.reduceMoneys[k] = true
          }
          this.getPrice()
          this.asyncFlag = true
        }
      },
      async address () {
        let paramenter = {
          LoginUserId: this.$user.id()
        }
        var addressList = await this.$api.httpGet('/api/useraddress/get', paramenter)
        this.addressList = addressList.result
      },
      newAdd () {
        this.dialogFormVisible = false
        this.address()
      },
      async orderAddress (data, index) {
        if (data.isDefault) {
          return false
        } else {
          let defaultParameter = {
            userId: this.$user.id(),
            id: data.id
          }
          var defaultMsg = await this.$api.httpPost('/api/useraddress/SETDEFAULT', defaultParameter)
          if (defaultMsg.status === 1) {
            const loading = this.$loading({
              lock: true,
              text: '切换中',
              spinner: 'el-icon-loading',
              background: 'rgba(0,0,0,.5)'
            })
            var vueThis = this
            setTimeout(() => {
              loading.close()
              vueThis.address()
              this.addressMsg = this.addressList[index]
            }, 500)
          }
        }
      },
      async single () {
        if (this.$api.localGet('default_address') === undefined) {
          let parameter = {
            LoginUserId: this.$user.id()
          }
          var Single = await this.$api.httpGet('/Api/UserAddress/Single', parameter)
          if (Single.result === undefined) {
            this.$api.toastWarn('请先添加地址')
            this.$router.push({
              path: '/user/address/edit',
              query: { fromBuy: true }
            })
          } else {
            this.$api.localSet('default_address', Single.result)
            this.addressMsg = Single.result
            this.addressId = Single.result.id
          }
        } else {
          this.addressMsg = this.$api.localGet('default_address')
          this.addressId = this.$api.localGet('default_address').id
        }
      },
      async getPrice () {
        var storeDelivery = []
        for (var i = 0; i < this.viewModel.storeItems.length; i++) {
          var storeItem = this.viewModel.storeItems[i]
          var deliveryItem = {
            key: storeItem.storeId,
            value: this.showDelivery[i]
          }
          storeDelivery.push(deliveryItem)
        }
        var reduceMoneys = []
        for (var k = 0; k < this.viewModel.allowMoneys.length; k++) {
          var allowMoneyItem = this.viewModel.allowMoneys[k]
          if (this.reduceMoneys[k]) {
            var reduceMoneyItem = {
              key: allowMoneyItem.moneyId,
              value: allowMoneyItem.maxPayPrice
            }
            reduceMoneys.push(reduceMoneyItem)
          }
        }
        var priceInput = {
          sign: this.viewModel.sign, // 传递签名
          loginUserId: this.$user.id(), // 用户Id
          addressId: this.addressId,
          reduceMoneysJson: JSON.stringify(reduceMoneys),
          storeExpressJson: JSON.stringify(storeDelivery)
        }
        var priceResponse = await this.$api.httpPost('/api/order/getprice', priceInput)
        if (priceResponse.status !== 1) {
          this.$notify.error({
            title: '错误',
            message: priceResponse.message,
            position: 'bottom-right'
          })
          return
        }
        this.priceView = priceResponse.result
        this.storePrices = this.priceView.storePrices
      },
      deliveryChange () {
        this.getPrice()
      },
      async  buy () {
        this.disBtn = true
        var storeBuyItems = []
        for (var i = 0; i < this.viewModel.storeItems.length; i++) {
          var storeBuyItem = this.viewModel.storeItems[i]
          var productBuyItems = []
          for (var j = 0; j < storeBuyItem.productSkuItems.length; j++) {
            var productSkuBuyItem = storeBuyItem.productSkuItems[j]
            var buyproductItem = {
              ProductSkuId: productSkuBuyItem.productSkuId,
              Count: productSkuBuyItem.buyCount,
              ProductId: productSkuBuyItem.productId,
              priceStyleId: productSkuBuyItem.priceStyleId,
              Amount: productSkuBuyItem.buyCount * productSkuBuyItem.price,
              storeId: storeBuyItem.storeId
            }
            productBuyItems.push(buyproductItem)
          }
          var buyStoreItem = {
            storeId: storeBuyItem.storeId,
            isGroupBuy: this.isGroupBuy, // 是否为拼图
            deliveryId: this.showDelivery[i], // 运费
            userMessage: this.userMessages[i],
            totalAmount: this.priceView.storePrices[i].totalAmount, // 店铺订单总价格
            totalCount: this.viewModel.storeItems[i].totalCount, // 店铺商品总数量
            expressAmount: this.priceView.storePrices[i].expressAmount, // 店铺运费
            productAmount: this.priceView.storePrices[i].productAmount, // 店铺总商品费用
            productSkuItems: productBuyItems
          }
          storeBuyItems.push(buyStoreItem)
        }
        // 虚拟资产
        var reduceMoneys = []
        for (var r = 0; r < this.viewModel.allowMoneys.length; r++) {
          var allowMoneyItem = this.viewModel.allowMoneys[r]
          if (this.reduceMoneys[r]) {
            var reduceMoneyItem = {
              key: allowMoneyItem.moneyId,
              value: allowMoneyItem.maxPayPrice
            }
            reduceMoneys.push(reduceMoneyItem)
          }
        }
        var buyInput = {
          reduceMoneysJson: JSON.stringify(reduceMoneys),
          StoreOrderJson: JSON.stringify(storeBuyItems),
          addressId: this.addressId, // 选择地址Id
          payType: 3, // 支付方式
          totalAmount: this.priceView.totalAmount, // 订单总金额
          TotalCount: this.viewModel.totalCount, // 订单总商品
          paymentAmount: this.priceView.totalAmount, // 订单总金额
          orderType: 1, // 订单类型
          // isGroupBuy: this.isGroupBuy, // 是否为拼团购买/*  */
          sign: this.viewModel.sign, // 签名信息
          isFromCart: this.isFromCart, // 是否从购物车购买
          isFromOrder: this.isFromOrder, // 是否从订货页面来
          userId: this.$user.id() // 下单用户ID
          // activityRecordId: this.activityRecordId
        }
        var response = await this.$api.httpPost('/api/order/buy', buyInput)
        if (response.status === 1) {
          this.$router.push(
            {
              name: 'order-pay',
              params: {
                payId: response.result.payId,
                amount: response.result.payAmount,
                orderIds: response.result.orderIds,
                redirectUrl: '/index'
              }
            }
          )
          // this.$refs.show_pay.$emit('payMethod', response.result.payId, response.result.payAmount, response.result.orderIds, '/index')
          // this.asyncFlag = false
          // this.num = 2
        } else {
          this.$notify.warning(response.message)
        }
      },
      editAddress (data) {
        this.actionType = 'edit'
        this.dialogFormVisible = true
        this.addressItem = data
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>
