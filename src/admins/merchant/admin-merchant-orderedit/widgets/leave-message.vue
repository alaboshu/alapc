<template>
  <div class="operation-list">
    <ul class="operation-list_ul">
      <li class="operation-list_li">
        <div class="operation-left">(BuyerMessage) 买家留言</div>
        <div class="operation-right">{{message.buyerMessage}}</div>
      </li>
      <li class="operation-list_li">
        <div class="operation-left">(SellerMessge) 卖家留言</div>
        <div class="operation-right">{{message.sellerMessge}}</div>
      </li>
      <li class="operation-list_li">
        <div class="operation-left">(PlatplatformMessage)平台留言</div>
        <div class="operation-right">{{message.platplatformMessage}}</div>
      </li>
      <li class="operation-list_li">
        <div class="operation-left">(BuyerRemark) 买家备注</div>
        <div class="operation-right">{{mark.buyerRemark}}</div>
      </li>
      <li class="operation-list_li">
        <div class="operation-left">(SellerRemark) 卖家备注</div>
        <div class="operation-right">{{mark.sellerRemark}}</div>
      </li>
      <li class="operation-list_li">
        <div class="operation-left">(PlatplatformRemark)平台备注</div>
        <div class="operation-right">{{mark.platplatformRemark}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      viewModel: {}
    },
    data () {
      return {
        message: this.viewModel.order.orderExtension.message,
        mark: this.viewModel.order.orderExtension.orderRemark
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../styles/style.scss";
</style>


