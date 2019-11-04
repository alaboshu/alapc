<template>
  <div>
    <el-alert v-if="viewModel.moduleConfig" style="margin-bottom:5px" :title="viewModel.moduleConfig.title" type="success" :description="viewModel.moduleConfig.intro" :closable="false" show-icon>
    </el-alert>
    <!--viewModel.base && viewModel.base.title-->
    <x-line :border="true" :title="'规则配置'" type="metal" icon="flaticon-security" style="padding:0px 15px;"></x-line>
    <zk-auto-form :serviceConfig="viewModel.autoForm" :showBotton="false" @viewForm="viewForm"></zk-auto-form>
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
    },
    methods: {
      viewForm (data) {
        this.viewModel.value = JSON.stringify(data)
      }
    }
  }
</script>
