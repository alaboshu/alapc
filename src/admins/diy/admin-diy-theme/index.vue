<template>
  <div class="admin-diy-admin">
    <div class="admin-pages-list" v-loading="!diyThemes">
      <theme-item @deleteTheme="deleteTheme" @makeTheme="makeTheme" v-for="(theme,index) in diyThemes" :defautTheme="defaultTheme" :theme="theme" :key="index"></theme-item>
    </div>
    <delete-theme name="模板" ref="zkRootDelete" rootType="5"></delete-theme>
    <make-theme name="模板" ref="zkRootMake" rootType="5" @afterMake="afterMake"></make-theme>
  </div>
</template>

<script>
  import themeItem from './style/item'
  import deleteTheme from './style/delete'
  import makeTheme from './style/make'
  import diyHttp from '@/service/core/diy.http'
  import './var.scss'
  export default {
    components: {
      themeItem,
      deleteTheme,
      makeTheme
    },
    data () {
      return {
        defaultTheme: null,
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
        var response = await this.$api.httpGet('/api/theme/getDefaultTheme', this.widget.value)
        if (response.status === 1) {
          this.defaultTheme = response.result
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
        } else {
          this.$api.alert(response.message)
        }
      },
      async makeTheme (theme) {
        this.$refs.zkRootMake.init(theme)
      },
      async afterMake (theme) {
        this.init()
      },
      async deleteTheme (theme) {
        console.info('删除模板', theme)
        this.$refs.zkRootDelete.dialogFormVisible = true
        this.$refs.zkRootDelete.paraForm.themeId = theme.id
      }
    }
  }
</script>
