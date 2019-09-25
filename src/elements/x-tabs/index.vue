<template>
  <div class="x-table_tabs">
    <el-tabs>
      <el-tab-pane>
        <span slot="label" class="tab-pane-span"><i class="flaticon-analytics"></i>商品信息</span>
        <div class="tab-pane-box">
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class="tab-pane-span"><i class="flaticon-diagram"></i>操作记录</span>
        <div class="tab-pane-box">
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class="tab-pane-span"><i class="flaticon-alarm"></i>发货记录</span>
        <div class="tab-pane-box">
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class="tab-pane-span"><i class="flaticon-exclamation"></i>支付信息</span>
        <div class="tab-pane-box">
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class="tab-pane-span"><i class="flaticon-medical"></i>留言备注</span>
        <div class="tab-pane-box">
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .x-table_tabs {
    .el-tabs--top {
      margin: 0px;
      width: 100%;
    }
    .tab-pane-span {
      font-size: 13px;
      i {
        font-size: 17px;
        vertical-align: -1px;
        margin-right: 5px;
      }
    }
  }
</style>
