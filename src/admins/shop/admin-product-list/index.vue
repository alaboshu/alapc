<template>
  <div>
    <x-table ref="xTable" type="ProductTable" @afterTableLoad="afterTableLoad">
    </x-table>
  </div>

</template>
<script>
  export default {
    props: {
      widgetData: {}
    },
    data () {
      return {
        priceStyleId: null,
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.widgetData && this.widgetData.value) {
          this.priceStyleId = this.widgetData.value.priceStyleId
        }
        if (!this.priceStyleId) {
          this.$api.alert('商城模式不正确,请在DIY系统中配置')
        }
        console.info('priceStyleId', this.priceStyleId)
      },
      async afterTableLoad (dataResult) {
        console.info('dataResult', dataResult)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
