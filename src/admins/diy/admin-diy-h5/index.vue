<template>
  <div class="admin-diy-h5">
    <admin-pages-list :widgetModel="viewModel"></admin-pages-list>
  </div>
</template>

<script>
  import './var.scss'
  export default {
    data () {
      return {
        widgetModel: {},
        viewModel: []
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
        var response = await this.$api.httpGet('/api/theme/querylist')
        if (response.status === 1) {
          response.result.forEach(element => {
            var dataItem = response.result.find(t => t.clientType === 2)
            if (dataItem) {
              this.viewModel.push(dataItem)
            }
          })
        }
      }
    }
  }
</script>
