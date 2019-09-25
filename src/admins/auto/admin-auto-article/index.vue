<template>
  <x-border :title="widgetData.title" icon="flaticon-settings">
    <zk-aritcle-detail :viewModel="viewModel" :widgetData="widgetData" v-if="async"></zk-aritcle-detail>
  </x-border>
</template>


<script>
  export default {
    data () {
      return {
        async: false,
        viewModel: null
      }
    },
    props: {
      widgetData: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.async = false

        var type = this.widgetData.type
        var id = this.$route.query.id
        var para = {
          type: type,
          id,
          ...this.$crud.routeToObject()
        }
        var response = await this.$api.httpGet('/Api/Auto/article', para)
        if (response.status === 1) {
          this.viewModel = response.result
        } else {
          this.$alert(response.message, '类型输入错误', {
            confirmButtonText: '确定'
          })
        }
        this.async = true
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

