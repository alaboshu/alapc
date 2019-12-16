<template>
  <div class="admin-login">
    <div class="admin-login_box">
      <div class="m-login__logo">
        <img src="../../../../static/img/logo.png" />
      </div>
      <div class="m-login__signin">
        <h3>管理员登录</h3>
        <div class="form-control">
          <div class="m-input">
            <input v-model="user.username" placeholder="用户名" />
          </div>
          <div class="m-input">
            <input type="password" v-model="user.password" placeholder="密码" />
          </div>
          <div class="m-login__form-sub" v-if="false">
            <div class="sub_text-color">
              <el-checkbox v-model="checked">记住密码</el-checkbox>
            </div>
            <div>
              <router-link to="" class="sub_text-color sub_forget" v-if="false">忘记密码?</router-link>
            </div>
          </div>
        </div>
        <div class="m-login__form-action">
          <el-button class="action_but" @click="subimt" :loading="loading">登录</el-button>
        </div>
        <div class="m-login__account" v-if="false">还没有账户？<router-link to="">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import theme from '@/service/core/theme'
  export default {
    data () {
      return {
        showPassword: true,
        typeValue: 'password',
        checked: false,
        loading: false,
        user: {
          username: '',
          password: ''
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.$user.isAdmin()) {
          this.$router.push('/Admin/index')
        }
        setTimeout(async () => {
          await theme.getAllPageList('admin')
        }, 3000)
      },
      async subimt () {
        this.loading = true
        await this.$user.login(this.user)
        this.loading = false
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
