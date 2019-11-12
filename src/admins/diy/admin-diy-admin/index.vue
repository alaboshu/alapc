<template>
  <view class="admin-diy-admin">{{widgetModel}}</view>
</template>

<script>
  import './var.scss'


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
