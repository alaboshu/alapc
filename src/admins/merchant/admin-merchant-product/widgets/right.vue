<template>
  <div>
    <div class="user-right">
      <el-tabs>
        <el-tab-pane>
          <span slot="label" class="tab-pane-span"><i class="flaticon-analytics"></i>商品信息</span>
          <div class="tab-pane-box">
            <MerChanDise :viewModel="viewModel"></MerChanDise>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="tab-pane-span"><i class="flaticon-diagram"></i>操作记录</span>
          <div class="tab-pane-box">
            <OperatingRecord :viewModel="viewModel"></OperatingRecord>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="tab-pane-span"><i class="flaticon-exclamation"></i>支付信息</span>
          <div class="tab-pane-box">
            <OperationList :viewModel="viewModel"></OperationList>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import MerChanDise from './merchandise'
  import OperationList from './operation-list'
  import OperatingRecord from './operating-record'

  export default {
    props: {
      viewModel: {}

    },
    components: {
      MerChanDise,
      OperationList,
      OperatingRecord
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../styles/style.scss";
</style>
