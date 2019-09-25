
<template>
  <div v-if="async">
    <Essential :viewModel="viewModel"></Essential>
    <Sell :viewModel="viewModel"></Sell>
  </div>
</template>



<script>
  import Essential from './essential'
  import Sell from './sell'
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
  @import "./styles/index.scss";
</style>

