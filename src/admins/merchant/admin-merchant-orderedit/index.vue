<template>
  <x-border title="订单详情" type="primary">
    <div class="order-edit" v-if="viewModel">
      <div class="user-management_left">
        <Left :viewModel="viewModel"></Left>
      </div>
      <div class="user-management_right">
        <Right :viewModel="viewModel"></Right>
      </div>
    </div>
  </x-border>
</template>
<script>
  import Left from './widgets/left.vue'
  import Right from './widgets/right.vue'
  export default {
    components: {
      Left,
      Right
    },
    data () {
      return {
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        let para = {
          id: this.$route.query.id
        }
        var response = await this.$api.httpGet('Api/MerchantOrder/GetOrder', para)
        this.viewModel = response.result
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./styles/style.scss";
</style>
