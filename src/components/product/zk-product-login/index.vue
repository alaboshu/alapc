<template>
  <div class="zk-product-login">
    <div class="zk-product-login_box">
      <div class="login_box_content">
        <div class="login_box-title">
          <div class="title_news">
            <span v-for="(item,index) in typeData" :key="index" @click="getIndex(index)" :class="Cindex===index ? 'currentType':''">{{item}}</span>
          </div>
        </div>
        <div v-show="Cindex===0" class="user_news">
          <div class="user_news_name">
            <x-icon src="zk-mobilephone" size="20" color="#999"></x-icon>
            <input type="text" v-model="user.username" placeholder="请输入手机号">
          </div>
          <div class="user_news_password">
            <x-icon src="zk-combinationlock" size="20" color="#999"></x-icon>
            <input type="password" v-model="user.password" placeholder="请输入密码">
          </div>
          <div class="user_login_btn" @click="subimt">登录</div>
          <div class="user_login-text">
            <div class="reg-buttom" @click="$router.push('/reg')">注册</div>
            <div class="reg-buttom" v-if="false">忘记密码？</div>
          </div>
          <div class="user_aggrement" v-if="false">
            <el-checkbox v-model="checked"></el-checkbox>
            我同意《服务条款》和《匠芯云隐私政策》
          </div>
        </div>
        <div v-show="Cindex===1" class="user_news">
          <div class="user_news_name">
            <x-icon src="zk-mobilephone" size="20" color="#999"></x-icon>
            <input type="text" placeholder="请输入手机号">
          </div>
          <div class="user_news_code">
            <input type="text" placeholder="请输入短信验证码">
            <div class="get_code_test">获取验证码</div>
          </div>
          <div class="user_login_btn">登录</div>
          <div class="user_aggrement" v-if="false">
            <el-checkbox v-model="checked"></el-checkbox>
            我同意《服务条款》和《匠芯云隐私政策》
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        widgetModel: {},
        checked: false,
        typeData: ['账号密码登录'],
        Cindex: 0,
        value1: 0,
        user: {
          username: '',
          password: ''
        }
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
        if (this.$user.isLogin()) {
          this.$alert('你已登录').then(() => {
            this.$router.push('/user/index')
          }).catch(() => {
            this.$router.push('/user/index')
          })
        }
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      getIndex (index) {
        this.Cindex = index
      },
      async subimt () {
        await this.$user.login(this.user)
      }
    }
  }
</script>
