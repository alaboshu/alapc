<template>
  <div class="team-list">
    <ul class="team-list_ul  merchandise_ul">
      <li class="team-list_li">
        <div class="team-list_li-left">
          <div class="left-title">订单总金额</div>
          <div class="left-enit">TotalAmount</div>
        </div>
        <div class="right-number number-noe">+{{parseFloat(viewModel.totalAmount).toFixed(2)}}</div>
      </li>
      <li class="team-list_li">
        <div class="team-list_li-left">
          <div class="left-title">现金总支付</div>
          <div class="left-enit">PaymentAmount</div>
        </div>
        <div class="right-number number-two">￥{{ parseFloat(viewModel.paymentAmount).toFixed(2)}}</div>
      </li>
      <li class="team-list_li">
        <div class="team-list_li-left">
          <div class="left-title">总商品数</div>
          <div class="left-enit">TotalCount</div>
        </div>
        <div class="right-number number-noe">{{viewModel.totalCount}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      viewModel: {}
    },
    mounted () {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../styles/style.scss";
</style>

