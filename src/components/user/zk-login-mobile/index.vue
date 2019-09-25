<template>
  <div class="zk-login-mobile">
    <x-login-mobile :elementData="widgetModel.value"></x-login-mobile>
  </div>
</template>

<script>
  
  export default {
    
    data () {
      return {
        widgetModel: ''
      }
    },
    props: {
      widget: {}
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
      }
    }
  }
</script>

