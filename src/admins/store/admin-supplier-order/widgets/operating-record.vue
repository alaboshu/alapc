<template>
  <div class="operating-record">
    <div class="operating-record_box">
      <div class="number-text">{{viewModel.createTime}}</div>
      <div class="record_box">
        <div class="record_box-list"></div>
        <div class="record_box-circle"></div>
        <div class="record_box-list"></div>
      </div>
      <div class="text_coter">会员{{viewModel.buyUser.userName}}({{viewModel.buyUser.name}})创建订单，订单金额为{{viewModel.totalAmount}}</div>
    </div>
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
  @import "../styles/operating-record.scss";
</style>

