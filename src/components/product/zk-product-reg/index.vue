<template>
  <div class="zk-product-reg">
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
            <input type="text" v-model="user.mobile" placeholder="请输入手机号">
          </div>
          <div class="verification-code">
            <input class="verification-code_input" placeholder="请输入短信验证码" v-model="user.mobileVerifiyCode" />
            <div class="verification-code_box" @click="getCode" v-if="codeFool">获取验证码</div>
            <div class="verification-code_box" v-else>{{timerMinute}}秒后重发</div>
          </div>
          <div class="user_news_password">
            <x-icon src="zk-combinationlock" size="20" color="#999"></x-icon>
            <input type="password" v-model="user.password" placeholder="请输入密码">
          </div>
          <div class="user_news_password">
            <x-icon src="zk-info-user" size="20" color="#999"></x-icon>
            <input type="password" v-model="user.code" placeholder="请输入推荐人">
          </div>
          <div class="user_login_btn" @click="sumbit">注册</div>
          <div class="user_login-text">
            <div class="reg-buttom" @click="$router.push('/login')">已有账号？</div>
          </div>
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
        typeData: ['手机号码注册'],
        Cindex: 0,
        value1: 0,
        user: {
          mobile: '',
          password: '',
          mobileVerifiyCode: '',
          code: ''
        },
        timerMinute: 60,
        codeFool: true
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
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      sumbit () {
        this.$user.reg(this.user)
      },
      async getCode () {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (myreg.test(this.user.mobile)) {
          let parament = {
            mobile: String(this.user.mobile)
          }
          var response = await this.$api.httpGet('Api/Common/SendMobileVerifiyCode', parament)
          if (response.status === 1) {
            this.codeFool = false
            var than = this
            var thime = setInterval(function () {
              than.timerMinute--
              if (than.timerMinute <= 0) {
                clearInterval(thime)
                than.codeFool = true
                than.timerMinute = 60
              }
            }, 1000)
          }
        } else {
          this.$notify({
            title: '警告',
            message: '手机号码不正确',
            type: 'warning'
          })
        }
      }
    }
  }
</script>
