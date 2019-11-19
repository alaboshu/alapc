<template>
  <div class="aside-left">
    <div class="stair-navigation" v-if="roleOutput">
      <div class="stair-navigation-list">
        <ul class="stair-ul">
          <li class="stair-li" :class="{'stair_active':index===leftCurrentMenu.oneIndex}" v-for="(item,index) in roleOutput.menus" :key="index" @click="to(item)" v-show="item.isEnable">
            <div class="stair-box">
              <i :class="item.icon"></i>
              {{item.name}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="shared-second-sidebar" v-show="leftCurrentMenu.showChildMenu ">
      <div class="shared-second-sidebar-nav">
        <div class="shared-second-sidebar-nav-list">
          <ul class="sidebar-nav_ul" v-show="secondMenus">
            <li class="sidebar-nav_li" v-for="(secondMenu,twoIndex) in secondMenus" :key="twoIndex">
              <div class="sidebar-nav_box" :class="{'avtice_nav':secondMenu.open==true}" @click="secondMenuClick(secondMenu)" v-show="secondMenu.isEnable">
                <span class="sidebar-nav_box-span"><i class="el-icon-arrow-right" v-if="secondMenu.menus && secondMenu.menus.length!==0"></i></span>
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
      isDiy: {},
      adminAppItem: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.leftCurrentMenu = await this.$api.vuexLocalGet('admin_current_menu')
        if (this.leftCurrentMenu) {
          this.secondMenus = this.roleOutput.menus[this.leftCurrentMenu.oneIndex].menus
          console.info('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          var menuData = this.$api.localGet('adminRoleOutput')
          var threeMenu = this.$api.localGet('admin_current_menu')
          menuData.menus.forEach(element => {
            if (element.url === '/Admin/App') {
              this.isAdminItem(threeMenu, element)
            }
          })
        }
      },
      to (threeMenu) {
        this.$emit('clickMenu', threeMenu)
        this.leftCurrentMenu = threeMenu
        this.secondMenus = this.roleOutput.menus[this.leftCurrentMenu.oneIndex].menus
        var menuData = this.$api.localGet('adminRoleOutput')
        menuData.menus.forEach(element => {
          if (element.url === '/Admin/App') {
            this.isAdminItem(threeMenu, element)
          }
        })
      },
      secondMenuClick (item) {
        this.$set(item, 'open', !item.open)
      },
      isAdminItem (threeMenu, menuData) {
        if (menuData) {
          menuData.menus.forEach((element, index) => {
            if (element.url === threeMenu.url) {
              // 如果url等于三级菜单的url 则往上推一级
              this.secondMenus = []
              if (threeMenu.level === 3) {
                this.getLevel(threeMenu)
              } else if (this.adminAppItem) {
                this.secondMenus.push(this.adminAppItem)
              } else {
                this.secondMenus.push(threeMenu)
              }
              this.secondMenus[0].open = true
              this.leftCurrentMenu.twoIndex = 0
            } else if (element.menus && element.menus.length > 0) {
              this.isAdminItem(threeMenu, element)
            }
          })
        }
      },
      getLevel (item) {
        var menuData = this.$api.localGet('adminRoleOutput')
        menuData.menus.forEach(element => {
          if (element.url === '/Admin/App') {
            element.menus.forEach(twoChild => {
              if (twoChild.menus) {
                twoChild.menus.forEach(thereChild => {
                  if (thereChild.url === item.url) {
                    this.secondMenus.push(twoChild)
                  }
                })
              }
            })
          }
        })
      }
    },
    watch: {
      '$store.state.admin_current_menu': 'to',
      adminAppItem: {
        deep: true,
        handler (val) {
          this.init()
        }
      }
    }
  }
</script>
