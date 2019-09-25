<template>
  <div class="login-reg">
    <div class="default-login">
      <div class="login-head">
        <div class="head-left">登录</div>
        <div class="head-right" @click="getReg">
          注册
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="login-conter">
        <div class="login-pages">
          <div class="conter-box">
            <div class="login-pages_list">
              <div class="lable_text">手机号码</div>
              <div class="lable_input">
                <input v-model="user.username" placeholder="请输入手机号码" />
              </div>
            </div>
            <div class="login-pages_list">
              <div class="lable_text">登录密码</div>
              <div class="lable_input">
                <input v-model="user.password" :type="typeValue" placeholder="请输入登录密码" :password="showPassword" />
              </div>
              <div class="lable-password" @click="changePassword"><i class="el-icon-view" :class="{'hover_i':showPassword==false}"></i></div>
            </div>
            <a class="forget-password">忘记密码？</a>
          </div>
          <div class="login-foot">
            <div class="login-but" @click="subimt">登录</div>
            <div class="foot-text">账号登录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loginBool: false,
        showPassword: true,
        typeValue: 'password',
        user: {
          username: '',
          password: '',
          filter: 3
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.$user.isLogin()) {
          this.$alert('你已登录').then(() => {
            this.$router.push('/admin/index')
          }).catch(() => {
            this.$router.push('/admin/index')
          })
        }
      },
      async getReg () {
        this.$router.push('/reg')
      },
      changePassword () {
        this.showPassword = !this.showPassword
        if (!this.showPassword) {
          this.typeValue = 'text'
        } else {
          this.typeValue = 'password'
        }
      },
      async subimt () {
        await this.$user.login(this.user, '/admin/index')
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
