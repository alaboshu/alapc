<template>
  <div class="admin-diy-admin">
    <div class="admin-pages-list">
      <theme-item v-for="(widget,index) in widgetModel" :widget="widget" :key="index" type="本地模板"></theme-item>
      <theme-item v-for="(widget,index) in diyThemes" :widget="widget" :key="index+100" type="远程模板"></theme-item>
    </div>
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
        }
        await this.getDiyThemes()
      },
      // 获取远程模板
      async getDiyThemes () {
        var para = {
          ...this.widget.value
        }
        var response = await diyHttp.post('/api/DiyClient/GetAdminTheme', para)
        if (response.status === 1) {
          this.diyThemes = response.result.result
          console.info('云端模板', response.result, this.diyThemes)
        }
      }
    }
  }
</script>
