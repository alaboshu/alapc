<template>
  <div class="zk-order-list">
    <div class="order-list-wrapper">
      <div class="list-wrapper-search">
        <label for=""><input type="text" placeholder="请输入订单号" class="search-text"></label>
        <label for=""><input type="button" value="搜索" class="btn"></label>
      </div>
      <div class="order-list-content">
        <ul class="list">
          <li class="list-item" v-for="(item,index) in viewModel" :key="index">
            <div class="item-message">
              <div class="message-left">
                <div class="order-message"> <input type="checkbox"></div>
                <span class="order-number">订单生成时间：{{item.createTime}}</span>
              </div>
              <div class="item-center disflex">{{item.storeName}}</div>
              <div class="disflex"></div>
              <div class="disflex"></div>
              <div class="item-right disflex">地址：广州市白云区太和镇</div>
            </div>
            <div class="order-list-message" v-for="(i,index) in item.outOrderProducts " :key="index">
              <div class="box">
                <div class="box_ig">
                  <div class="order-list-left">
                    <img :src="i.thumbnailUrl" class="list-message-img ">
                  </div>
                  <div class="order-list-center ">
                    <div class="order-title ">{{i.name}}</div>
                    <div class="mall ">现金商城</div>
                  </div>
                </div>
              </div>
              <div class="list_order">
                <p class="order_p"> 合计:
                  <span class="amount">{{item.totalCount}}</span>件 </p>
                <p class="order_p"> 共：
                  <span class="order-price">{{item.paymentAmount }}</span>元</p>
              </div>
              <div class="order-list-three list_order">
                <div class="user ">测试员01</div>
                <div class="phone ">15812346789</div>
              </div>
              <div class="order-list-four list_order">
                <span class="postage" v-if="i.isFreeShipping">包邮</span>
                <span class="postage" v-eles="i.isFreeShipping">邮费：15元</span>
              </div>
              <div class="order-list-five list_order">
                <div class="status">{{item.orderStatuName}}</div>
                <div class="order-list">
                  <router-link to="/order/show">
                    <i class="iconfont" style="margin-right:5px;">&#xe65a;</i>
                    订单详情
                  </router-link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>

  // import { ORDER_INDEX_GET } from '@/service/core/apiUrl'
  export default {

    data () {
      return {
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
        this.widgetModel = await this.$api.themeWidget(this.widget)
        this.viewModel = this.widgetModel.value
      }
    }
  }
</script>
<style   lang="scss">
  @import "~_style/theme.scss";
  .zk-order-list {
    font-size: $gl-size-base;
    overflow: hidden;
    .list-item {
      line-height: 24px;
      overflow: hidden;
      border: 1px solid #e5e5e5;
      margin-bottom: 20px;
    }
    .order-list-wrapper {
      width: 1200px;
      margin: 0 auto;
    }
    .order-list-content {
      margin-top: 10px;
    }
    .list-wrapper-search {
      width: 250px;
      margin-top: 10px;
      border: 1px solid #c91623;
    }
    .search-text {
      width: 200px;
      padding: 5px 0;
      padding-left: 5px;
    }
    .btn {
      padding: 5px 10px;
      cursor: pointer;
      background-color: #c91623;
      color: white;
    }
    .box {
      padding: 15px;
    }
    .box_ig {
      display: flex;
    }
    .order-message {
      display: inline-block;
      vertical-align: -2px;
    }
    .item-center {
      text-align: center;
    }
    .item-message {
      padding: 5px 0px;
      background: white;
      display: flex;
    }
    .disflex {
      flex: 1;
    }
    .message-left {
      width: 450px;
      padding-left: 15px;
    }
    .order-list-message {
      border-top: 1px solid #e5e5e5;
      display: flex;
    }
    .list_order {
      flex: 1;
      border-left: 1px dashed #ccc;
      padding-top: 10px;
    }
    .box {
      width: 450px;
    }
    .list-message-img {
      width: 120px;
      height: 120px;
    }
    .order_p {
      text-align: center;
    }
    .order-title {
      font-size: 14px;
    }
    .order-name {
      color: #a2a5ab;
    }
    .price {
      color: #34c5c4;
    }
    .mall {
      height: 18px;
      color: #e83e8c;
    }
    .order-list-center {
      margin-left: 10px;
    }
    .order-list-three {
      text-align: center;
      border-left: 1px dashed #ccc;
      border-right: 1px dashed #ccc;
    }
    .item-right {
      text-align: center;
    }
    .user {
      color: #5867dd;
    }
    .phone {
      color: #7b808e;
    }
    .order-list-four {
      text-align: center;
      border-right: 1px dashed #ccc;
    }
    .money {
      color: #f45184;
    }
    .order-list-five {
      text-align: center;
    }
    .tatol,
    .freight {
      color: #aaadac;
    }
    .order-price {
      color: red;
    }
    .pirce {
      color: #6f727d;
    }
    .amount {
      color: red;
    }
    .status {
      margin: 0 auto;
      width: 50px;
      height: 25px;
      line-height: 25px;
      background: #716aca;
      border-radius: 10px;
      color: #fff;
      margin-bottom: 10px;
    }
  }
</style>

