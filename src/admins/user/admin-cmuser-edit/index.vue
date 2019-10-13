<template>
  <x-border title="会员管理" icon="el-icon-setting" type="accent" v-if="viewModel">
    <div class="user-management">
      <div class="user-management_left">
        <left :viewModel="viewModel"></left>
      </div>
      <div class="user-management_right">
        <right :viewModel="viewModel"></right>
      </div>
    </div>
  </x-border>
</template>
<script>
  import Left from './widgets/left.vue'
  import Right from './widgets/right.vue'
  export default {
    props: {
      widgetData: {}
    },
    components: {
      Left,
      Right
    },
    data () {
      return {
        viewModel: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var data = {
          id: this.$route.query.id
        }
        var response = await this.$api.httpGet('/Api/UserAdmin/Edit', data)
        if (response.status === 1) {
          this.viewModel = response.result
        } else {
          this.$alert(response.message, {
            confirmButtonText: '确定'
          })
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./widgets/style.scss";
</style>


