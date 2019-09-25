<template>
  <div class="layout-container_head">
    <div class="head-portrait">
      <img class="head-portrait_img" src="../../../../../../static/img/logo.png" />
    </div>
    <div class="wb-header">
      <div class="wb-header_left">
        <div class="wb-header_icon">
          <router-link class="wb-header_ibox" :to="'/'+roleOutput.prefix+'index'">
            <i class="icon-5333-zhuye"></i>
          </router-link>
        </div>
        <div class="wb-header_icon">
          <el-popover placement="bottom-end" trigger="hover">
            <div class="fast-nav">
              <div class=" fast-list">
                <div class="fast-list_title">最近访问</div>
                <div class="recent-visit">
                  <p class="fast-list_p" v-for="(item,index) in browsingHistory " :key="index" @click="to(item)">{{item.name}}</p>
                </div>
              </div>
              <div class="fast-list">
                <div class="fast-list_title">全部导航</div>
                <div class="recent-visit">
                  <p class="fast-list_p" v-for="(item,index) in roleOutput.menus" :key="index" :class="{'fast-list_p-active':topMenuActive===index}" v-show="item.isEnable &&item.menus" @click="changeChildMenu(index)">{{item.name}}</p>
                </div>
              </div>
              <div class="fast-list history">
                <div class="history-list" v-for="(item,index) in childMenus" :key="index" v-show="item.isEnable" @click="to(item)">{{item.name}}</div>
              </div>
            </div>
            <div class="back-stage_icon" slot="reference">
              <i class="el-icon-s-operation"></i>
            </div>
          </el-popover>

        </div>
        <div class="input-group">
          <el-autocomplete class="input-group_box" v-model="searchModel" :fetch-suggestions="querySearch" placeholder="请输入关键词进行功能搜索..." :trigger-on-focus="false" @select="search"></el-autocomplete>

          <div class="input-group_icon" @click="search()">
            <i class="el-icon-search"></i>
          </div>
        </div>
      </div>
      <div class="site-name" v-if="site">{{site.site.companyName}}</div>
      <div class="back-stage">
        <el-popover placement="bottom-end" trigger="hover">
          <div class="background-login-signature">
            <div class="back-stage-head" v-if="site">数据标识：{{site.sign}}</div>
            <div class="login-signature_box">
              <div class="signature-list" v-for="(quickItem,quickIndex) in topQuickMenus" :key="quickIndex" @click="quickAction(quickItem)">
                <div>
                  <div class="signature-list_icon">
                    <i class="icon iconfont" :class="quickItem.icon"></i>
                  </div>
                  <div class="signature-list_text">{{quickItem.name}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="back-stage_icon" slot="reference">
            <i class="flaticon-grid-menu"></i>
          </div>
        </el-popover>
      </div>
      <div class="nav-portrait">
        <el-popover placement="bottom-end" trigger="hover">
          <div class="popover-userinfo">
            <div class="popover-userinfo_head">
              <div class="userinfo-content">
                <div class="userinfo_img"><img :src="$user.loginUser().avator" /></div>
                <div class="userinfo_right">
                  <p>{{$user.loginUser().userName}}</p>
                  <p class="userinfo_right-number">{{$user.loginUser().mobile}}</p>
                </div>
              </div>
            </div>
            <div class="userinfo-listbox">
              <ul>
                <li v-for="(t,tindex) in suberList" :key="tindex" @click="$router.push(t.url)" v-show="tindex<3">
                  <div class="userinfo-listbox_i"><i class="iconver iconfont" :class="t.icon"></i></div>
                  <div class="userinfo-listbox_text">{{t.name}}</div>
                  <div class="corner-mark" v-if="t.number"><span>{{t.number}}</span></div>
                </li>
              </ul>
            </div>
            <div class="userinfo-listbox">
              <ul>
                <li v-for="(s,sindex) in suberList" :key="sindex" @click="$router.push(s.url)" v-show="sindex>3&&sindex<9">
                  <div class="userinfo-listbox_i"><i class="iconver iconfont" :class="suberLists.icon"></i></div>
                  <div class="userinfo-listbox_text">{{s.name}}</div>
                  <div class="corner-mark_2" v-if="s.number"><span>{{s.number}}</span></div>
                </li>
              </ul>
            </div>
            <div class="userinfo-exit">
              <div class="userinfo-but" @click="loginOut">退出</div>
            </div>
          </div>
          <div class="nav-portrait_img" slot="reference">
            <img :src="$user.loginUser().avator" alt="" />
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
  import './top.scss'
  import admin from '../../admin.js'
  export default {
    data () {
      return {
        topQuickMenus: null, // 头部快捷菜单
        browsingHistory: [], // 历史记录
        topMenuActive: 0, // 选中索引
        childMenus: [], // 所有子菜单
        allMenus: null, // 所有的菜单
        suberList: '',
        searchModel: ''
      }
    },
    props: {
      roleOutput: {}, // 菜单与前缀
      site: {},
      currentMenu: {}, // 当前访问菜单
      isDiy: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.topQuickMenus = await admin.topQuickMenus()
        this.browsingHistory = this.$api.vuexLocalGet('admin_browsing_history')
        // 加载导航菜单
        for (var i = 0; i < this.roleOutput.menus.length; i++) {
          var item = this.roleOutput.menus[i]
          if (item.menus) {
            this.changeChildMenu(i)
            break
          }
        }
        if (this.allMenus === null) {
          this.allMenus = admin.allMenus(this.roleOutput.menus)
        }
      },
      // 快捷操作
      async quickAction (quickItem) {
        await admin.quickAction(quickItem)
      },
      // 切换二级菜单
      changeChildMenu (index) {
        this.topMenuActive = index
        var itemMenu = this.roleOutput.menus[index]
        this.childMenus = []
        if (itemMenu.menus) {
          for (var twoIndex = 0; twoIndex < itemMenu.menus.length; twoIndex++) {
            var element = itemMenu.menus[twoIndex]
            for (var threeIndex = 0; threeIndex < element.menus.length; threeIndex++) {
              var r = element.menus[threeIndex]
              if (r.isEnable) {
                this.childMenus.push(r)
              }
            }
          }
        }
      },
      to (item) {
        this.$emit('clickMenu', item)
      },
      querySearch (queryString, cb) {
        var restaurants = Array.from(this.allMenus)
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        cb(results)
      },
      createFilter (queryString) {
        return (restaurant) => {
          var result = restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          return result
        }
      },
      loginOut () {
        this
          .$confirm('是否退出登录', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          .then(() => {
            window.location.href = `/${this.roleOutput.prefix}/login`
            this.$user.loginOut()
          })
          .catch(() => { })
      },
      // 确认搜索
      search (item) {
        if (item && item.id) {
          this.to(item)
        } else {
          if (this.$api.isEmpty(this.searchModel)) {
            this.$message({
              message: '请输入关键字',
              type: 'warning',
              offset: 80
            })
            return
          }
          var restaurants = Array.from(this.allMenus)
          var results = this.searchModel ? restaurants.filter(this.createFilter(this.searchModel)) : restaurants
          if (results.length === 0) {
            this.$message({
              message: '未找到您输入的链接，请重新输入',
              type: 'warning',
              offset: 80
            })
          } else {
            this.to(results[0])
          }
        }
      }

    }
  }
</script>
