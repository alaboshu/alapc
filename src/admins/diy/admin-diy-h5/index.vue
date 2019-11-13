<template>
  <view class="admin-diy-h5">{{widgetModel}}</view>
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
        
      }
    }
  }
</script>
