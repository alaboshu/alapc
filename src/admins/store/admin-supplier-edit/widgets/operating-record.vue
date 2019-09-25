<template>
  <div class="operating-record">
    <div class="operating-record_box">
      <div class="number-text"></div>
      <div class="record_box">
        <div class="record_box-list"></div>
        <!-- <div class="record_box-circle"></div> -->
        <div class="record_box-list"></div>
      </div>
      <!-- <div class="text_coter">会员{{viewModel.buyUser.userName}}({{viewModel.buyUser.name}})创建订单，订单金额为{{viewModel.totalAmount}}</div> -->
      <div class="text_coter">会员请求 {{viewModel.reason}} </div>
    </div>

    <div class="operating-record_box">
      <div class="number-text"></div>
      <div class="record_box">
        <div class="record_box-list"></div>

        <div class="record_box-list"></div>
      </div>
      <div class="text_coter">退货说明: {{viewModel.description}} </div>
    </div>

    <div class="operating-record_box">
      <div class="number-text"></div>
      <div class="record_box">
        <div class="record_box-list"></div>

        <div class="record_box-list"></div>
      </div>
      <!-- <div class="text_coter">会员{{viewModel.buyUser.userName}}({{viewModel.buyUser.name}})创建订单，订单金额为{{viewModel.totalAmount}}</div> -->
      <div class="text_coter">退货时间: {{viewModel.createTime}} </div>
    </div>
  </div>

  <!-- <div class="operating-record">
    <div class="operating-record_box" v-for="(item,index) in viewModel" :key="index">
      <div class="number-text"></div>
      <div class="record_box">
        <div class="record_box-list"></div>
        <div class="record_box-circle"></div>
        <div class="record_box-list"></div>
      </div>
       <div class="text_coter">会员{{viewModel.buyUser.userName}}({{viewModel.buyUser.name}})创建订单，订单金额为{{viewModel.totalAmount}}</div>
      <div class="text_coter">{{item.intro}}---{{item.createTime}} </div>
    </div>
  </div> -->

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

