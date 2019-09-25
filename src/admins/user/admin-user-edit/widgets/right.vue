<template>
  <div class="user-right" v-if="viewModel&&viewModel.user">
    <el-tabs>
      <el-tab-pane>
        <span slot="label" class="tab-pane-span"><i class="flaticon-analytics"></i>基本信息</span>
        <div class="tab-pane-box">
          <Basic :viewModel="viewModel" :actives="actives"></Basic>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class="tab-pane-span"><i class="flaticon-diagram"></i>详细信息</span>
        <div class="tab-pane-box">
          <Detailed :viewModel="viewModel" :actives="actives"></Detailed>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class="tab-pane-span"><i class="el-icon-edit-outline"></i>密码修改</span>
        <div class="tab-pane-box">
          <Modify></Modify>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import Basic from './usersubpage/basic.vue'
  import Detailed from './usersubpage/detailed.vue'
  import Modify from './usersubpage/modify.vue'
  import active from '../active.js'
  export default {
    props: ['viewModel'],
    components: {
      Basic,
      Detailed,
      Modify
    },
    data () {
      return {
        actives: active
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
  .user-right {
    .el-tabs--top {
      width: 98% !important;
    }
  }
</style>
