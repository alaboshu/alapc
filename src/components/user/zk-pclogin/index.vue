<template>
  <div class="zk-pclogin" v-if="async">
    <!-- <p-pclogin :elementData="widgetModel.value"></p-pclogin> -->
    <div class="pc-p-pclogin">
      <div class="bg" :style="'background-image:url('+widgetDiyBg+')'" v-if="widgetDiyBg"></div>
      <div class="bg" v-else></div>
      <div class="login-bg">
        <div class="login-box">
          <div class="account-number">
            <p class="right-text">还没账号？&nbsp;&nbsp;</p>
            <router-link to="/user/reg" class="right-link">请注册&gt;</router-link>
          </div>
          <div class="input-group">
            <div class="input-usn">
              <i class="icon-usn">
              </i>
              <input type="text" v-model="user.username" placeholder="已验证手机/邮箱/用户名" class="usn">
            </div>
            <div class="input-psw">
              <i class="icon-psw">
              </i>
              <input type="password" v-model="user.password" placeholder="密码" class="psw">
            </div>
            <div class="default-login">
              <input type="checkbox" name="checkbox" class="default-login-btn">
              <span class="default-login-text">自动登录</span>
            </div>
            <router-link to="/user/password/find" class="forget-password">
              忘记密码?
            </router-link>
            <input type="button" value="立即登录" class="login-btn" @click="login()">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import crypto from '@/service/utils/crypto'

  export default {

    data () {
      return {
        color: '#pink',
        async: false,
        widgetModel: '',
        viewModel: '',
        user: {
          username: '',
          password: ''
        },
        widgetDiyBg: null
      }
    },
    props: {
      widget: {}
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        if (!this.$api.isEmpty(this.$api.localGet('user_info'))) {
          var userInfo = JSON.parse(crypto.decrypt(crypto.utf8(crypto.base64(this.$api.localGet('user_info')))))
          this.user.username = userInfo.userName
          this.user.password = userInfo.password
        }
        if (this.widget.value !== null && this.widget.value.image !== null) {
          this.widgetDiyBg = this.widget.value.image
        }
        this.async = true
      },
      afterTo () {
        if (this.$route.path.indexOf('admin-city') !== -1) {
          this.user.filter = 6
          return '/admin-city/index'
        }
        if (this.$route.path.indexOf('admin-store') !== -1) {
          this.user.filter = 4
          return '/admin-store/index'
        }
        if (this.$route.path.indexOf('admin-market') !== -1) {
          this.user.filter = 101
          return '/admin-market/index'
        }
      },
      async login () {
        this.$user.login(this.user, this.afterTo())
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~_style/index.scss";
  .pc-p-pclogin {
    font-size: $gl-size-base;
    height: 500px;
    input {
      color: #666;
    }
    .bg {
      float: left;
      width: 100%;
      height: 500px;
      background-image: url(http://kinguv.oss-cn-beijing.aliyuncs.com/images/system/config/login_bg/login_bg_image_0.jpg);
      background-size: cover;
    }
    .login-bg {
      position: relative;
      width: 68%;
      margin: 0 auto;
      .login-box {
        position: absolute;
        top: 90px;
        right: 0;
        width: 346px;
        height: 300px;
        padding: 20px 30px;
        background-color: #fff;
        .account-number {
          width: 100%;
          height: 30px;
          .right-text {
            float: left;
            font-size: 12px;
            color: #999;
          }
          .right-link {
            display: inline-block;
            float: left;
            font-size: 13px;
            color: #c81623;
          }
        }
        .button-group {
          width: 100%;
          height: 35px;
          margin-top: 10px;
          .login {
            float: left;
            min-width: 50px;
            line-height: 32px;
            margin-right: 10px;
            padding: 0 15px;
            font-size: 13px;
            color: #666;
            cursor: pointer;
          }
          .trend-login {
            float: left;
            min-width: 50px;
            line-height: 32px;
            padding: 0 15px;
            font-size: 13px;
            cursor: pointer;
            color: #666;
          }
        }
        .input-group {
          margin-top: 30px;
          .input-usn,
          .input-psw {
            position: relative;
            height: 65px;
            overflow: hidden;
          }
          .usn {
            width: 286px;
            height: 35px;
            line-height: 35px;
            padding-left: 40px;
            border: 1px solid #999;
          }
          .psw {
            width: 286px;
            height: 35px;
            line-height: 35px;
            padding-left: 40px;
            border: 1px solid #999;
          }
          .icon-usn {
            position: absolute;
            top: 5px;
            left: 10px;
            display: block;
            width: 20px;
            height: 20px;
            background: url(http://www.kinguv.com/images/login-regiser-icon.png)
              no-repeat;
            background-position: 0 -15px;
          }
          .icon-psw {
            position: absolute;
            top: 6px;
            left: 10px;
            display: block;
            width: 20px;
            height: 20px;
            background: url(http://www.kinguv.com/images/login-regiser-icon.png)
              no-repeat;
            background-position: 0 -36px;
          }
          input::-webkit-input-placeholder {
            color: #999;
          }
        }
        .default-login {
          float: left;
          .default-login-text {
            display: block;
            margin-top: -21px;
            margin-left: 18px;
          }
        }
        .forget-password {
          float: right;
          margin-top: -3px;
          color: #666;
          cursor: pointer;
        }
        .forget-password:hover {
          color: red;
        }
        .login-btn {
          width: 286px;
          height: 35px;
          line-height: 35px;
          margin-top: 10px;
          color: #fff;
          background: #e31939;
          font-size: 14px;
          letter-spacing: 2px;
        }
      }
    }
  }
</style>
