<template>
  <div class="zk-order-show">
    <div class="order-show">
      <div class="order-show-wrapper">
        <div class="order-show-details">
          <div class="pirce-title">+313.00</div>
          <div class="pirce-box">
            <span class="pirce">现金支付(313.00)</span>
            <span class="total">总商品(1)</span>
          </div>
          <div class="user-message-box">
            <span class="usernane">JaVi</span>
            <span class="status">正常</span>
          </div>
          <div class="mailbox-box">
            <span class="mailbox">1564932004@qq.com</span>
            <span class="phone">15812345678</span>
          </div>
          <div class="datamessage-box">
            <span class="order">分润订单</span>
            <span class="data">分润数据</span>
            <span class="message">发送信息</span>
            <span class="details">会员详情</span>
          </div>
        </div>
        <div class="message-list">
          <ul class="list">
            <li class="li-message">
              <p class="text-left">姓名电话</p>
              <p class="text-right">
                <span>云根</span> 15812345678</p>
            </li>
            <li class="li-message">
              <p class="text-left">地址</p>
              <p class="text-right">广东省广州市白云区太和镇南村西华大街号</p>
            </li>
            <li class="li-message">
              <p class="text-left">买家留言</p>
            </li>
            <li class="li-message">
              <p class="text-left">平台留言</p>
            </li>
            <li class="li-message">
              <p class="text-left">平台备注</p>
            </li>
            <li class="li-message">
              <p class="text-left">订单编号</p>
              <p class="text-right">88888888</p>
            </li>
            <li class="li-message">
              <p class="text-left">店铺</p>
              <p class="text-right">自营</p>
            </li>
            <li class="li-message">
              <p class="text-left">快递方式</p>
              <p class="text-right">顺丰快递</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="order-right-top">
        <p class="order-title-text">
          订单已经完成，感谢您在京东商城购物，欢迎您对本次交易及所购商品进行评价。
        </p>
        <ul class="list-progress-bar">
          <li class="li">
            <i class="progress-bar-img bg"></i>
            <div class="li-box-text">
              <p class="box-text">
                提交订单
              </p>
              <p class="box-time">
                2018-07-16 00:00:10
              </p>
            </div>
          </li>
          <li class="progress"></li>
          <li class="li">
            <i class="payment-img bg"></i>
            <div class="li-box-text">
              <p class="box-text">
                付款成功
              </p>
            </div>
          </li>
          <li class="progress"></li>
          <li class="li">
            <i class="out bg"></i>
            <div class="li-box-text">
              <p class="box-text">
                商品出库
              </p>
            </div>
          </li>
          <li class="progress"></li>
          <li class="li">
            <i class="delivery bg"></i>
            <div class="li-box-text">
              <p class="box-text">
                等待收货
              </p>
            </div>
          </li>
          <li class="progress"></li>
          <li class="li">
            <i class="complete bg"></i>
            <div class="li-box-text">
              <p class="box-text">
                完成
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="order-right-bottom">
        <div class="order-message">
          <p class="order-message-title">
            商品信息
          </p>
          <div class="details-box">
            <ul class="details-list" style="overflow:hidden">
              <li class="details-item">
                <div class="details-img">
                  <img src="http://zkgs.5ug.com//wwwroot/Uploads/Product/2018/05/02e9746673b5433eaf2cba6796532671.jpg_320X320.jpg" class="details-bg">
                </div>
                <div class="details-text">
                  <p class="title">Banobagi弹力紧致果冻面膜</p>
                  <span class="amount">33</span>元
                </div>
              </li>
              <li class="details-item">
                <div class="details-img">
                  <img src="http://zkgs.5ug.com//wwwroot/Uploads/Product/2018/05/02e9746673b5433eaf2cba6796532671.jpg_320X320.jpg" class="details-bg">
                </div>
                <div class="details-text">
                  <p class="title">Banobagi弹力紧致果冻面膜</p>
                  <span class="amount">33</span>元
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { ORDER_SHOW_GET } from '@/service/core/apiUrl'

  export default {

    data () {
      return {
        ready: false,
        widgetModel: '',
        viewModel: ''
      }
    },
    props: {
      widget: {}
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        let parameter = {
          id: this.$route.query.id
        }
        var orderShowResponse = await this.$api.httpGet(ORDER_SHOW_GET, parameter)
        this.viewModel = orderShowResponse.result
        // this.widgetModel = await this.$api.themeWidget(this.widget)
        this.ready = true
      }
    }
  }
</script>
<style  lang="scss">
  @import "~_style/index.scss";
  .zk-order-show {
    font-size: $gl-size-base;
    background: #f2f3f8;
    .order-show {
      overflow: hidden;
      padding-top: 15px;
    }
    .order-show-wrapper {
      float: left;
      width: 30%;
      height: 500px;
      background: white;
      margin-right: 30px;
    }
    .order-show-details {
      height: 180px;
      border-bottom: 1px solid #f4f5f8;
    }
    .pirce-title {
      height: 40px;
      margin-top: 30px;
      font-size: 24px;
      color: #716aca;
      text-align: center;
    }
    .pirce-box {
      margin-top: 10px;
      text-align: center;
      color: #8c9dac;
    }
    .pirce-box span {
      font-size: 14px;
    }
    .user-message-box {
      text-align: center;
      height: 22px;
    }
    .usernane {
      font-size: 14px;
      color: #1b1c1e;
    }
    .status {
      display: inline-block;
      height: 22px;
      line-height: 22px;
      background-color: #34bfa3;
      padding: 0 5px;
      border-radius: 5px;
      margin-left: 5px;
      color: #fff;
    }
    .mailbox-box {
      text-align: center;
    }
    .mailbox-box span {
      display: inline-block;
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      color: #7b7e8a;
    }
    .datamessage-box {
      text-align: center;
      margin-top: 5px;
    }
    .datamessage-box span {
      display: inline-block;
      width: 60px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      color: white;
      border-radius: 5px;
    }
    .order {
      background-color: #716aca;
    }
    .data {
      background-color: #f4516c;
    }
    .message {
      background-color: #34bfa3;
    }
    .details {
      background-color: #36a3f7;
    }
    .message-list {
      margin-top: 20px;
    }
    .li-message {
      height: 36px;
      line-height: 36px;
      padding: 0 10px;
      background: white;
      border-bottom: 1px solid #f7f7f7;
    }
    .li-message:hover {
      background: #f7f8fa;
    }
    .li-message:hover .text-left {
      color: #716aca;
    }
    .li-message:hover .text-right {
      color: #716aca;
    }
    .text-left {
      float: left;
      font-size: 14px;
    }
    .text-right {
      float: right;
      text-align: right;
      width: 250px;
      font-size: 14px;
      color: #a19ed3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .order-right-top {
      float: left;
      width: 67%;
      padding: 20px;
      background-color: white;
      color: #aaa;
    }
    .order-right-top li {
      float: left;
    }
    .bg {
      display: block;
      margin: 0 auto;
      width: 43px;
      height: 43px;
      background-image: url("https://misc.360buyimg.com/user/order/0.0.1/css/i/node-icons.png");
      background-repeat: no-repeat;
    }
    .progress-bar-img {
      background-position: 0 -108px;
    }
    .progress {
      width: 15%;
      height: 9px;
      background-image: url("https://misc.360buyimg.com/user/order/0.0.1/css/i/proce-icons.png");
      background-repeat: no-repeat;
      background-position: 0 -20px;
      margin-top: 16px;
    }
    .payment-img {
      background-position: -54px -108px;
    }
    .li-box-text {
      text-align: center;
      font-size: 14px;
    }
    .out {
      background-position: -108px -108px;
    }
    .delivery {
      background-position: -270px -108px;
    }
    .complete {
      background-position: -216px -54px;
    }
    .list-progress-bar {
      margin-top: 70px;
    }
    .box-text {
      margin-top: 5px;
      font-size: 14px;
    }
    .order-right-bottom {
      float: left;
      width: 67%;
      margin-top: 20px;
      background: #fff;
    }
    .order-message-title {
      height: 30px;
      line-height: 30px;
      padding-left: 15px;
      border-bottom: 1px solid #ebedf2;
      font-size: 14px;
      color: #7b7e8a;
    }
    .details-img {
      float: left;
    }
    .details-bg {
      float: left;
      width: 160px;
      height: 160px;
      margin-right: 100px;
    }
    .li {
      width: 8%;
    }
    .title {
      margin-bottom: 20px;
      font-size: 16px;
    }
    .amount {
      font-size: 14px;
      color: red;
    }
    .number {
      font-size: 14px;
    }
    .details-item {
      height: 160px;
      margin: 15px 15px;
    }
  }
</style>

