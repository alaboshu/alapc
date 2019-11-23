<template>
  <view class="v-charts-table">{{widgetModel}}</view>
</template>

<script>
  export default {
    data () {
      return {
        widgetModel: {}
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>
