<template>
  <el-container class="layout-container">
    <el-header height="50px">
      <top :roleOutput="roleOutput" :isDiy="isDiy" :currentMenu="currentMenu" @clickMenu="clickMenu" :site="site"></top>
    </el-header>
    <el-container>
      <el-aside :width="currentMenu.asideWidth">
        <left :roleOutput="roleOutput" :isDiy="isDiy" :currentMenu="currentMenu" @clickMenu="clickMenu"></left>
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
        currentMenu: {} // 当前访问的菜单
      }
    },
    props: {
      roleOutput: {}, // 菜单与前缀
      site: {},
      isDiy: {}
    },
    mounted () {
      this.init()
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
      clickMenu (menu) {
        this.currentMenu = menu
        this.$admin.to(this.currentMenu, this.isDiy)
      }
    }
  }
</script>
