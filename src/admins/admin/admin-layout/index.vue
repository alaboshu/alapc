<template>
  <div v-if="async">
    <div class="admin-layout">
      <admin-nav :roleOutput="roleOutput" :isDiy="isDiy" :site="site" v-if="styleItem==1 " ref="levelNavigation">
      </admin-nav>
      <user-nav :roleOutput="roleOutput" :site="site" :isDiy="isDiy" v-if="styleItem==2" ref="userNav"></user-nav>
      <fold-nav widget="widgetModel" :site="site" :isDiy="isDiy" :roleOutput="roleOutput" v-if="styleItem==3" ref="foldingNavigation"></fold-nav>
      <div v-if="isDiy" class="edit-set" @click="editMenu()">编辑菜单</div>
    </div>
    <zk-auto-dialog></zk-auto-dialog>
  </div>
</template>
<script>
  import './var.scss'
  import adminNav from './item/admin-nav/index.vue'
  import userNav from './item/user-nav/index.vue'
  import foldNav from './item/fold-nav/index.vue'
  import admin from './admin.js'
  import diy from './diy.js'
  export default {
    components: {
      adminNav,
      userNav,
      foldNav
    },
    props: {
      isDiy: {}
    },
    data () {
      return {
        styleItem: 1,
        async: false,
        roleOutput: null,
        site: null
      }
    },
    async mounted () {
      this.$bus.$on('global_loading_theme', async () => {
        console.info('mounted')
        this.roleOutput = null
        await this.init()
      })
      this.$bus.$on('global_diy_menus', (data) => {
        this.init(data)
      })
      this.init()
    },
    methods: {
      async init (diyMenus) {
        await admin.loginByToken() // 检查是否登录
        if (this.roleOutput == null) {
          if (this.isDiy === true) {
            this.roleOutput = diy.diyMenus(diyMenus)
            console.info('diy 模板', this.roleOutput)
          } else {
            this.roleOutput = await this.$admin.employeeLogin(this.isDiy)
          }
        }
        if (this.roleOutput === null) {
          this.$user.loginOut()
          this.$alert('登录已失效,请重新登录')
          this.$router.push('/admin/login')
        }
        if (this.site == null) {
          this.site = await this.$base.siteAsync()
        }
        this.async = true
        if (this.$route.fullPath === '/admin') {
          this.$router.push('/admin/index')
        }
      },
      // diy菜单编辑
      editMenu () {
        diy.editMenu(this)
      }
    }

  }
</script>
