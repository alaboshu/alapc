<template>
  <div class="admin-diy-admin">
    <theme-item :widgetModel="widgetModel" v-if="widgetModel"></theme-item>
    <theme-item :widgetModel="diyThemes" v-if="diyThemes"></theme-item>
  </div>
</template>

<script>
  import themeItem from './style/item'
  import diyHttp from '@/service/core/diy.http'
  import './var.scss'
  export default {
    components: {
      themeItem
    },
    data () {
      return {
        widgetModel: null,
        diyThemes: null // 远程模板
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
        this.getDiyThemes()
      },
      // 获取远程模板
      async getDiyThemes () {
        var para = {
          ...this.widget.value,
          site: this.$api.localGet('site_default').site
        }
        var response = await diyHttp.post('/api/root/GetAdminTheme', para)
        if (response.status === 1) {
          this.widgetModel = response.result
          console.info('theme', response.result, this.widgetModel)
        }
      }
    }
  }
</script>
