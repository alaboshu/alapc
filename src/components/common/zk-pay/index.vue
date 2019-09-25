<template>
  <div class="zk-order-paid" v-if="showPay">
    <div class="order-top">
      <ul class="top_content">
        <li></li>
        <li>我的收银台</li>
        <li>
          <!-- <el-select v-model="value8" filterable placeholder="中国大陆" size="mini">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
        </li>
        <li class="top_news">
          <!-- <p>支付宝账户：&nbsp;1589452525</p>
          <p><a href="##">找人代付</a></p>
          <p>唯一热线：985623</p> -->
        </li>
      </ul>
    </div>
    <div class="containers">
      <div class="content_top">
        <div class="c_top_left">
          <!-- <img src="https://img-bss.csdn.net/201804021755503899.png"> -->
        </div>
        <div class="c_top_mid">
          <p>订单提交成功，请尽快付款！订单号：89293195329</p>
          <!-- <p>请您在24小时内完成支付，否则订单会被自动取消(库存紧俏订单请参见详情页时限)</p> -->
        </div>
        <div class="c_top_right">应付总金额：<span>{{amount}}元</span></div>
      </div>
      <div class="content_middle">
        <div class="left_btn">支付方式</div>
        <ul>
          <li class="payType_item" v-for="(pay,payIndex) in PayTypeList" :key="payIndex">
            <input type="radio" name="pay" @click="selectPayType = pay.payType" :checked="selectPayType === pay.payType">
            <x-icon :src="'icon-'+pay.icon" size="26"></x-icon>
            <span>{{pay.name}}</span>
            <p class="balance">{{pay.intro}}</p>
          </li>
        </ul>
        <div class="paid_password" v-if="selectPayType===1">
          <p>请输入六位数字的密码</p>
          <div style=" display:flex" class="paid_password-box">
            <input v-model="password" ref="psdInput" type="tel" maxlength="6" class="padTransparent">
            <div>
              <ul class="psdInput" @click="$refs.psdInput.focus()">
                <li class="psdItem"><i v-if="password.length>0"></i></li>
                <li class="psdItem"><i v-if="password.length>1"></i></li>
                <li class="psdItem"><i v-if="password.length>2"></i></li>
                <li class="psdItem"><i v-if="password.length>3"></i></li>
                <li class="psdItem"><i v-if="password.length>4"></i></li>
                <li class="psdItem"><i v-if="password.length>5"></i></li>
              </ul>
            </div>
            <p class="foget_password" v-if="false">忘记密码?</p>
          </div>
        </div>
        <div class="paid_btn" @click="inspectionPsd()">立即支付</div>
      </div>

    </div>
  </div>
</template>

<script>

  import { PAY_GETLIST_GET, PAY_PAY_POST } from '@/service/core/apiUrl.js'
  import { setTimeout } from 'timers'
  export default {

    data () {
      return {
        showPupop: false,
        payTypes: [], // 支付方式
        asyncFlag: false, // 异步数据传递判断，如果没有获取完成则不传递数据子组件中
        orderIds: [],
        payId: 0, // 支付账单Id
        amount: 0.0, // 支付金额
        PayTypeList: [],
        selectPayType: 0, // 选择的支付方式
        note: '', // 显示标题
        redirectUrl: {}, // 支付后指定跳转链接，默认使用订单详情页
        items: [0, 1, 2, 3, 4, 5],
        // keys: keys(),
        password: '',
        option: {},
        showPayPassword: false,
        onlyPassword: false, // 只弹出支付窗口
        isKeyBoard: true,
        showPay: false
      }
    },
    props: {
      widget: {}
    },
    async onShow () {
    },
    mounted () {
      this.$on('payMethod', function (payId, amount, orderIds, redirectUrl) {
        this.payId = payId
        this.amount = amount
        this.orderIds = orderIds
        this.init() //  点击以后，才请求支付
        this.showPay = true
        this.redirectUrl = redirectUrl // 不同的地方有不同的跳转
      })
    },
    methods: {
      async  init () {
        this.userName = this.$user.loginUser().userName
        let paras = {
          browserType: 1, // this.ClientType // 在gloal中获取支付方式列表
          amount: this.amount,
          payId: this.payId,
          LoginUserId: this.$user.id()
        }
        var response = await this.$api.httpGet(PAY_GETLIST_GET, paras) // 获取支付方式列表
        if (response.status === 1) {
          this.PayTypeList = response.result.payTypeList
          this.selectPayType = response.result.payTypeList[0].payType
        }
      },
      async inspectionPsd () {
        if (this.selectPayType === 1) {
          let paramenter = {
            payPassWord: this.password,
            loginUserId: this.$user.id()
          }
          var message = await this.$api.httpPost('Api/User/ConfirmPayPassword', paramenter)
          if (message.status === 1) {
            this.pay()
          } else {
            this.$notify.warning(message.message)
          }
        } else {
          this.pay()
        }
      },
      async pay () {
        let paras = {
          amount: this.amount,
          payType: this.selectPayType,
          payId: this.payId,
          redirectUrl: this.redirectUrl,
          // openId: this.$api.localGet('wechat_openId'),
          LoginUserId: this.$user.id()
        }
        var response = await this.$api.httpPost(PAY_PAY_POST, paras)
        if (response.status === 1) {
          if (this.selectPayType === 7) {

          } else if (this.selectPayType === 3) {

          } else if (this.selectPayType === 2) {
            location.href = response.result.message
          } else {
            this.$notify.success('支付成功')
            const loading = this.$loading({
              lock: true,
              text: '支付成功，正在跳转...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            setTimeout(() => {
              // window.location.href = '/user/order/list'
              loading.close()
              if (this.redirectUrl === undefined && this.redirectUrl === null) {
                this.redirectUrl = '/user/index'
              }
              var _this = this
              this.$router.push({
                path: _this.redirectUrl

              })
            }, 2000)
          }
        } else {
          this.$notify.warning(response.message)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~_style_all/theme.scss";
  @import "~./index.scss";
</style>
