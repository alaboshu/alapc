<template>
  <el-container class="layout-container">
    <el-header height="50px">
      <top :roleOutput="roleOutput" :isDiy="isDiy" :currentMenu="currentMenu" @clickMenu="clickMenu" :site="site"></top>
    </el-header>
    <el-container>
      <el-aside :width="currentMenu.asideWidth">
        <left :roleOutput="roleOutput" ref="leftAdmin" :isDiy="isDiy" :adminAppItem="adminAppItem" :currentMenu="currentMenu" @clickMenu="clickMenu"></left>
      </el-aside>
      <el-main>
        <transition mode="out-in">
          <router-view class="view-container"></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import './index.scss'
  import top from './top.vue'
  import left from './left.vue'
  export default {
    components: {
      top,
      left
    },
    data () {
      return {
        currentMenu: {}, // 当前访问的菜单
        adminAppItem: null // 记录应用页面点击的选项
      }
    },
    props: {
      roleOutput: {}, // 菜单与前缀
      site: {},
      isDiy: {}
    },
    mounted () {
      this.init()
      this.$bus.$off('global_bus_admin_app_click').$on('global_bus_admin_app_click', (viewModel, item) => {
        this.$admin.appEnums('link', viewModel, item)
        this.adminAppItem = item
        this.init()
      })
    },
    methods: {
      init () {
        this.currentMenu = this.$api.vuexLocalGet('admin_current_menu')
        if (!this.currentMenu) {
          this.currentMenu = this.roleOutput.menus[0]
          this.$api.vuexLocalSet('admin_current_menu', this.currentMenu)
        }
      },
      // 点击菜单
      clickMenu (menu, type) {
        // 处理最近访问       
        this.currentMenu = menu
        if (type) {
          this.recentVisit(menu, this.roleOutput)
        } else {
          this.$admin.to(this.currentMenu, this.isDiy)
        }
      },
      recentVisit (menu, data) {
        var currItem = null
        data.menus.forEach(element => {
          if (element.id !== menu.id) {
            if (element.menus !== null) {
              element.menus.forEach(twoChild => {
                if (twoChild.id !== menu.id) {
                  if (twoChild.menus !== null) {
                    twoChild.menus.forEach(threeChild => {
                      if (threeChild.id === menu.id) {
                        currItem = threeChild
                      }
                    })
                  }
                } else {
                  currItem = twoChild
                }
              })
            }
          } else {
            currItem = element
          }
        })
        this.$refs.leftAdmin.to(currItem)
      }
    },
    watch: {
      '$route': {
        deep: true,
        handler (to, from) {
          if (to.path === '/Admin/App') {
            var currteItem = null
            for (let i of this.roleOutput.menus) {
              if (to.path === i.url) {
                currteItem = i
              }
            }
            this.$refs.leftAdmin.to(currteItem)
          }
        }
      }
    }
  }
</script>
