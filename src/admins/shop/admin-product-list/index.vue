<template>
  <x-table ref="xTable" type="ProductTable"> </x-table>
</template>
<script>
  export default {
    props: {
      widgetData: {}
    },
    data () {
      return {
        reload: true, // 是否刷新
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
      },
      // 监听 x-widget值得变化,不能直接监听路由，直接监听路由可能会导致数据延迟
      watchWidget (val) {
        if (this.reload === false) {
          this.init()
          this.$nextTick(() => {
            if (this.$refs.xTable) {
              this.$refs.xTable.init('ProductTable')
            }
          })
        }
        this.reload = false // 解决刷新浏览器，数据加载两次的问题
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
