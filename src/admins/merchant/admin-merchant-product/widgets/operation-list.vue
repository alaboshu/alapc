<template>
  <div class="operation-list">
    <ul class="operation-list_ul">
      <li class="operation-list_li">
        <div class="operation-left">(PayType) 支付方式</div>
        <div class="operation-right">{{viewModel.paymentType}}</div>
      </li>
      <li class="operation-list_li">
        <div class="operation-left">支付金额</div>
        <div class="operation-right">{{parseFloat(viewModel.totalAmount).toFixed(2)}}</div>
      </li>
      <li class="operation-list_li">
        <div class="operation-left">(CreateTime)账单创建时间</div>
        <div class="operation-right"><span class="creation-time">{{viewModel.createTime}}</span></div>
      </li>
      <li class="operation-list_li">
        <div class="operation-left">(ResponseTime)支付时间</div>
        <div class="operation-right">{{viewModel.payTime}}</div>
      </li>
      <li class="operation-list_li">
        <div class="operation-left">ResponseSerial(流水号)</div>
        <div class="operation-right">{{viewModel.serial}}</div>
      </li>
      <li class="operation-list_li">
        <div class="operation-left">类型:</div>
        <div class="operation-right"><span class="conversion">订单</span></div>
      </li>
      <li class="operation-list_li">
        <div class="operation-left">支付账单描述:</div>
        <div class="operation-right"><span class="bill-description">请认真核对订单信息</span></div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      viewModel: {}
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../styles/style.scss";
</style>


