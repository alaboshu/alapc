<template>
  <div class="zk-product-top">
    <div class="top-nav">
      <div class="top-nav_left">
        <div class="friendly-reminder">您好！欢迎光临<span class="friendly-reminder_span">阿拉博数</span></div>
        <div class="log-words" v-if="!loginTool">
          <div @click="loginTo" class="log-words_color words-after">登录</div>
          <!-- <router-link to="/login" class="log-words_color words-after">登录</router-link> -->
          <router-link to="/reg" class="log-words_color">注册</router-link>
        </div>
        <div class="log-words" v-else>
          <div class="log-information">
            <!-- <img class="information_img" :src="valueModel.avator" /> -->
            <div class="information_title">{{valueModel.userName}}</div>
            <div class="information_exit" @click="headOut">退出</div>
          </div>
        </div>
      </div>
      <div class="top-nav_right">
        <router-link to="/index" class="log-words_color words-after">首页</router-link>
        <router-link to="/user/index" class="log-words_color words-after">会员中心</router-link>
        <router-link to="/user/order/Purchase/List" class="log-words_color words-after">订单中心</router-link>
        <router-link to="/articles/help/index" class="log-words_color words-after">帮助中心</router-link>
        <router-link to="/articles/topline/index" class="log-words_color words-after">头条</router-link>
        <div class="log-words_color">
          <el-popover placement="bottom-start" width="150" trigger="hover">
            <div v-for="(item, index) in listData" :key="index" v-show="item.inshow" class="admin-list">
              <router-link :to="item.url">{{item.name}}</router-link>
            </div>
            <div slot="reference">管理中心</div>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import './var.scss'
  import json from './index.json'


  export default {

    inject: ['reload'],
    data () {
      return {
        widgetModel: {},
        loginTool: false,
        valueModel: '',
        listData: json.links
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
        // this.widgetModel = await this.$api.themeWidget(this.widget, editSetting.config)
        if (this.$user.isLogin()) {
          this.loginTool = true
        }
        this.valueModel = this.$user.loginUser()
      },
      async headOut () {
        this.$confirm('是否退出登录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$router.push('/')
          this.$user.loginOut()
          this.reload()
        }).catch(() => { })
      },
      loginTo () {
        this.$user.toLogin()
      }
    }
  }
</script>

<style  lang="scss" scoped>
  .admin-list {
    padding: 5px;
    padding-left: 15px;
    &:hover {
      background: #f5f7fa;
    }
    a {
      font-size: 14px;
      color: #606266;
    }
  }
</style>
