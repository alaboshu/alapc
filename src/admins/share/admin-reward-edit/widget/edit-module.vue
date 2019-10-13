<template>
  <div>
    <el-alert style="margin-bottom:5px" :title="viewModel.base.title" type="success" :description="viewModel.base.intro" :closable="false" show-icon>
    </el-alert>
    <x-line :border="true" :title="viewModel.base.title+'规则配置'" type="metal" icon="flaticon-security" style="padding:0px 15px;"></x-line>
    <zk-auto-form :serviceConfig="viewModel.autoForm" :showBotton="false"></zk-auto-form>
  </div>
</template>
<script>
  export default {
    props: {
      viewModel: {}
    },
    data () {
      return {
      }
    }
  }
</script>
