<template>
  <div class="admin-diy-admin">
    <theme-item :widgetModel="viewModel"></theme-item>
  </div>
</template>

<script>
  import themeItem from './style/item'
  import './var.scss'
  export default {
    components: {
      themeItem
    },
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
        var response = await this.$api.httpGet('/api/theme/GetAdminTheme', this.widget.value)
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
