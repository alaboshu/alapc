<template>
  <div class="admin-diy-admin">
    <theme-item :widgetModel="widgetModel" v-if="widgetModel"></theme-item>
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
        widgetModel: null
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
          this.widgetModel = response.result
          console.info('theme', response.result, this.widgetModel)
        }
      }
    }
  }
</script>
