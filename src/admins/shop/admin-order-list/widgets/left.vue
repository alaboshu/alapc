<template>
  <div class="user-left">
    <div class="edit-left">
      <div class="edit-left_number">
        <div class="number-title">+{{ parseFloat(viewModel.totalAmount).toFixed(2)}}</div>
        <div class="expense-title">现金支付({{parseFloat(viewModel.paymentAmount).toFixed(2)}}) 总商品数({{viewModel.totalCount}})</div>
      </div>
      <div class="edit-left-top">
        <div class="edit-subscriber">
          <div class="edit-user-top-title">{{viewModel.buyUser.userName}}({{viewModel.buyUser.name}})</div>
          <div class="edit-user-top-button">正常</div>
        </div>
        <div class="edit-user-text">{{viewModel.buyUser.email}}&nbsp;&nbsp;&nbsp;&nbsp;{{viewModel.buyUser.mobile}}</div>
        <!-- <ul class="edit-user-buttom-button">
          <li>ta的推荐</li>
          <li>发送短信</li>
          <li>删除会员</li>
        </ul> -->
        <div class="user_top_bottom"></div>
      </div>
      <detail :viewModel="viewModel"></detail>
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
              <div class="left-title">现金总支付</div>
              <div class="left-enit">PaymentAmount</div>
            </div>
            <div class="right-number number-two">￥{{ parseFloat(viewModel.paymentAmount).toFixed(2)}}</div>
          </li>
          <li class="team-list_li">
            <div class="team-list_li-left">
              <div class="left-title">邮费</div>
              <div class="left-enit">ExpressAmount</div>
            </div>
            <div class="right-number number-three">{{ parseFloat(viewModel.expressAmount).toFixed(2)}}</div>
          </li>
          <!-- <li class="team-list_li">
            <div class="team-list_li-left">
              <div class="left-title">服务费</div>
              <div class="left-enit">FeeAmount</div>
            </div>
            <div class="right-number number-four">1</div>
          </li> -->
          <!-- <li class="team-list_li">
            <div class="team-list_li-left">
              <div class="left-title">冻积分</div>
              <div class="left-enit">抵现223.0元 服务费0.0</div>
            </div>
            <div class="right-number number-noe">-223</div>
          </li> -->
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
  import detail from './detail.vue'
  export default {
    props: {
      viewModel: {}
    },
    components: { detail }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../styles/style.scss";
</style>
