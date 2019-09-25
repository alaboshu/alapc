<template>
  <x-border :title="title">
    <zk-ariticle-image-list :widgetData="widgetData" v-if="async"></zk-ariticle-image-list>
  </x-border>
</template>

<script>
  export default {
    props: {
      widgetData: {},
      title: {}
    },
    data () {
      return {
        async: false,
        viewModel: null
      }
    },

    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.async = false
        var type = this.$crud.getType()
        var para = {
          type: type,
          ...this.$crud.routeToObject()
        }
        var response = await this.$api.httpGet('/Api/auto/news', para)
        if (response.status === 1) {
          this.viewModel = response.result
          this.async = true
        } else {
          this.$alert(response.message, '类型输入错误', {
            confirmButtonText: '确定'
          })
        }
      },
      getPath () {
        this.init()
      }
    },
    watch: {
      '$route': 'getPath'
    }
  }
</script>

