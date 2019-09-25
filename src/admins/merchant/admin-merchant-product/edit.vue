
<template>
  <div v-if="async">
    <Essential :viewModel="viewModel"></Essential>
    <Sell :viewModel="viewModel"></Sell>
  </div>
</template>



<script>
  import Essential from './widgets/essential'
  import Sell from './widgets/sell'
  export default {
    components: {
      Essential,
      Sell
    },
    data () {
      return {
        async: false,
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.viewModel = await this.$crud.getView('Api/MerchantProduct/ViewById')
        if (this.viewModel.skus === null) {
          this.viewModel.skus = []
        }
        if (this.viewModel.images === null) {
          this.viewModel.images = []
        }
        this.async = true
      }
    }
  }
</script>


<style lang="scss" scoped>
  // @import "./edit/styles/index.scss";
</style>

