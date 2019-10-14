<template>
  <div class="aside-left">
    <div class="stair-navigation" v-if="roleOutput">
      <ul class="stair-ul">
        <li class="stair-li" :class="{'stair_active':index===leftCurrentMenu.oneIndex}" v-for="(item,index) in roleOutput.menus" :key="index" @click="to(item)" v-show="item.isEnable">
          <div class="stair-box">
            <i :class="item.icon"></i>
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="shared-second-sidebar" v-show="leftCurrentMenu.showChildMenu ">
      <div class="shared-second-sidebar-nav">
        <ul class="sidebar-nav_ul" v-show="secondMenus">
          <li class="sidebar-nav_li" v-for="(secondMenu,twoIndex) in secondMenus" :key="twoIndex">
            <div class="sidebar-nav_box" :class="{'avtice_nav':secondMenu.open==true}" @click="secondMenuClick(secondMenu)" v-show="secondMenu.isEnable">
              <span class="sidebar-nav_box-span"><i class="el-icon-arrow-right" v-if="secondMenu.menus.length!==0"></i></span>
              <div class="sidebar_title">{{secondMenu.name}}</div>
            </div>
            <div class="sidebar-nav_drop-down" :class="{'drop-down_active':secondMenu.open==true}">
              <div class="drop-down_li " :class="{'three-menu-active':threeIndex==leftCurrentMenu.threeIndex && twoIndex===leftCurrentMenu.twoIndex}" v-for="(threeMenu,threeIndex) in secondMenu.menus" :key="threeIndex" @click="to(threeMenu)" v-show="threeMenu.isEnable">
                {{threeMenu.name}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import './left.scss'
  export default {
    data () {
      return {
        leftCurrentMenu: {}, // 当前访问菜单
        secondMenus: {} // 二级菜单
      }
    },
    props: {
      roleOutput: {}, // 菜单与前缀
      currentMenu: {}, // 当前访问菜单
      site: {},
      isDiy: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.leftCurrentMenu = await this.$api.vuexLocalGet('admin_current_menu')
        this.secondMenus = this.roleOutput.menus[this.leftCurrentMenu.oneIndex].menus
      },
      to (threeMenu) {
        this.$emit('clickMenu', threeMenu)
        this.leftCurrentMenu = threeMenu
        this.secondMenus = this.roleOutput.menus[this.leftCurrentMenu.oneIndex].menus
      },
      secondMenuClick (item) {
        this.$set(item, 'open', !item.open)
      }
    },
    watch: {
      '$store.state.admin_current_menu': 'to'
    }
  }
</script>
