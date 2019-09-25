<template>
  <div class="user-left">
    <div class="edit-left">
      <div class="edit-left_number">
        <div class="number-title">+{{ parseFloat(viewModel.totalAmount).toFixed(2)}}</div>
        <div class="expense-title">总支付({{parseFloat(viewModel.paymentAmount).toFixed(2)}}) 总商品数({{viewModel.totalCount}})</div>
      </div>
      <div class="edit-left-top">
        <div class="edit-subscriber">
          <div class="edit-user-top-title">{{viewModel.buyUser.userName}}({{viewModel.buyUser.name}})</div>
          <div class="edit-user-top-button">正常</div>
        </div>
        <div class="edit-user-text">{{viewModel.buyUser.email}}&nbsp;&nbsp;&nbsp;&nbsp;{{viewModel.buyUser.mobile}}</div>
        <div class="user_top_bottom"></div>
      </div>
      <userList :viewModel="viewModel"></userList>
      <div class="team-list">
        <ul class="team-list_ul">
          <li class="team-list_li">
            <div class="team-list_li-left">
              <div class="left-title">订单总金额</div>
              <div class="left-enit">TotalAmount</div>
            </div>
            <div class="right-number number-noe">+{{parseFloat(viewModel.totalAmount).toFixed(2)}}</div>
          </li>
          <li class="team-list_li">
            <div class="team-list_li-left">
              <div class="left-title">实际支付</div>
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
    </div>
  </div>
</template>
<script>
  import userList from './userList.vue'
  export default {
    props: {
      viewModel: {}
    },
    components: { userList }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../styles/style.scss";
</style>
