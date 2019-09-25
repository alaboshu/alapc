<template>
  <div class="zk-pcreg">
    <div class="pc-p-pcreg">
      <div class="reg-header">
        <div class="border">
          <div class="reg-logo">
            <div class="logo-left">
              <!-- <img src="http://ui.5ug.com/static/hehe/swiper/01.jpg" class="logo-img"> -->
              <p class="log-reg-text">立即注册</p>
            </div>
            <div class="logo-right">
              <p class="right-text">已有账号?&nbsp;&nbsp;</p>
              <router-link to="/user/login" class="right-link">请登陆&gt;</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="reg-content">
        <div class="progress-bar">
          <div class="cirle-box">
            <span class="cirle active">1</span>
            <p class="cirle-text hover">验证手机号</p>
          </div>
          <div class="cirle-bg"></div>
          <div class="cirle-box">
            <span class="cirle">2</span>
            <p class="cirle-text">填写账号信息</p>
          </div>
          <div class="cirle-bg"></div>
          <div class="cirle-box">
            <span class="cirle">3</span>
            <p class="cirle-text">注册成功</p>
          </div>
          <div class="input-group">
            <form action="">
              <div class="validate-group">
                <label class="address">中国0086
                  <i class="down"></i>
                </label>
                <div class="phone">
                  <input type="text" class="number-text" placeholder="建议使用常用手机号" v-model="form.mobile">
                </div>
                <!-- <p class="psw-prompt" :class="{'psw-prompt-block':cli==true}">
                  <i class="el-icon-warning"></i>
                  验证完成后，你可以使用该手机登录或者找回密码
                </p> -->
              </div>
              <div class="next">
                <input placeholder="请输入密码" type="password" class="phone-btn-code" v-model="form.password">
              </div>
              <div class="next">
                <input value="点击按钮获取验证码" type="button" class="phone-btn" @click="changePswText()" v-if="sendAuthCode">
                <input :value="countdownTime+'秒后重新获取'" type="button" class="phone-btn" v-if="!sendAuthCode">
              </div>
              <div class="next">
                <input placeholder="请输入验证码" type="text" class="phone-btn-code" v-model="form.mobileVerifiyCode">
              </div>

              <input value="确认" type="button" class="next-btn" @click="sumbit()">
            </form>
          </div>
          <div class="write-message" style="display: none">
            <div class="message-box">
              <div class="username">
                <label class="username-text" for="" style="letter-spacing: 10px">用户名</label>
                <input type="text" placeholder="你的账号名和登录名" class="username-input">
                <p></p>
              </div>
            </div>
            <div class="message-box">
              <div class="username">
                <label class="username-text" for="" style="letter-spacing: 5px;">设置密码</label>
                <input type="password" placeholder="建议使用两种或以上字符组合" class="username-input">
                <p></p>
              </div>
            </div>
            <div class="message-box">
              <div class="username">
                <label class="username-text" for="" style="letter-spacing: 5px">确认密码</label>
                <input type="password" placeholder="再次输入密码" class="username-input">

              </div>
            </div>
            <div class="message-box">
              <div class="username">
                <label class="username-text" for="" style="letter-spacing: 5px">邮箱验证</label>
                <input type="text" placeholder="请输入邮箱" class="username-input">
                <p></p>
              </div>
            </div>
            <div class="message-box">
              <div class="username code-box">
                <label class="username-text" for="" style="letter-spacing: 1px">邮箱验证码</label>
                <input type="text" placeholder="请输入邮箱验证码" class="username-input code">

                <p></p>
              </div>
              <input type="button" value="获取验证码" class="code-btn">
            </div>
          </div>
          <!-- <div class="reg-channel">
            <div class="enterprise reg-btn">
              <i class="icon"></i>
              <p class="enterprise-text">企业用户注册</p>
            </div>
            <div class="international reg-btn">
              <i class="international-icon"></i>
              <p class="international-text">国际站注册</p>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {

    data () {
      return {
        widgetModel: '',
        countdownTime: '',
        sendAuthCode: true,
        form: {
          mobile: null,
          password: null,
          mobileVerifiyCode: null
        }
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
        // this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      sumbit () {
        this.$user.reg(this.form)
      },
      async  changePswText () {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (myreg.test(this.form.mobile)) {
          let parament = {
            mobile: String(this.form.mobile)
          }

          var response = await this.$api.httpGet('Api/Common/SendMobileVerifiyCode', parament)
          if (response.status === 1) {
            this.sendAuthCode = false
            this.countdownTime = 60
            var vueThis = this
            var authTimetimer = setInterval(() => {
              vueThis.countdownTime--
              if (vueThis.countdownTime <= 0) {
                clearInterval(authTimetimer)
                vueThis.sendAuthCode = true
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
<style lang="scss">
  @import "~_style/index.scss";
  .pc-p-pcreg {
    font-size: $gl-size-base;
    .border {
      border-bottom: 5px solid rgb(245, 245, 245);
      .reg-logo {
        width: 78%;
        height: 100px;
        padding-top: 15px;
        margin: 0 auto;

        .logo-img {
          float: left;
          width: 160px;
          height: 50px;
        }
        .log-reg-text {
          float: left;
          margin-top: 8px;
          font-size: 24px;
        }
        .logo-right {
          float: right;
          line-height: 76px;
          .right-text {
            float: left;
            font-size: 16px;
            color: #999;
          }
          .right-link {
            display: inline-block;
            float: left;
            font-size: 16px;
            color: #c81623;
          }
        }
      }
    }
    .reg-content {
      height: 385px;
    }
    .progress-bar {
      width: 518px;
      margin: 100px auto 50px;
      .cirle-box {
        float: left;
        width: 68px;
        height: 55px;
        margin-bottom: 40px;
        .cirle {
          display: block;
          width: 24px;
          height: 24px;
          color: #ccc;
          text-align: center;
          line-height: 22px;
          border: 1px solid #ccc;
          border-radius: 50%;
          margin: 0 auto;
          font-size: 12px;
        }
        .active {
          background-color: #3b4;
          border: 1px solid #3b4;
          color: white;
        }

        .cirle-text {
          color: #ccc;
          min-width: 72px;
          margin-top: 10px;
          text-align: center;
        }
        .hover {
          color: #3b4;
        }
      }
      .cirle-bg {
        float: left;
        width: 124px;
        height: 10px;
        margin-top: 5px;
        background-image: url("https://misc.360buyimg.com/user/reg/3.0.0/css/i/reg-icon.png");
        background-position: 0 -100px;
      }
      .validate-group,
      .next {
        height: 86px;
      }
      .input-group {
        float: left;
      }
      .phone {
        float: left;
        width: 334px;
        height: 53px;
        border: 1px solid #ddd;
      }
      .number-text {
        width: 332px;
        height: 50px;
        padding-bottom: 5px;
        padding-left: 20px;
        padding-top: 5px;
        font-size: 14px;
        color: #000;
      }
      .address {
        float: left;
        display: inline-block;
        padding-left: 20px;
        width: 85px;
        height: 51px;
        line-height: 51px;
        font-size: 14px;
        color: #666;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        border-left: 1px solid #ddd;
      }
      .down {
        float: right;
        width: 15px;
        height: 15px;
        margin-top: 16px;
        margin-right: 4px;
        background-image: url("https://misc.360buyimg.com/user/reg/3.0.0/css/i/icon.png");
        background-position: -2px -150px;
        background-repeat: no-repeat;
      }
      .phone-btn {
        width: 440px;
        height: 52px;
        background-color: white;
        border: 1px solid #ddd;
        color: #333;
        font-size: 14px;
        cursor: pointer;
      }
      .phone-btn-code {
        width: 440px;
        height: 52px;
        background-color: white;
        border: 1px solid #ddd;
        color: #333;
        font-size: 14px;
        padding-left: 5px;
      }
      .psw-prompt {
        font-size: 13px;
        color: #ccc;
        display: none;
      }
      .psw-prompt-block {
        display: block;
      }
      .next-btn {
        width: 440px;
        height: 54px;
        color: white;
        background-color: red;
        font-size: 16px;
        cursor: pointer;
        margin-bottom: 28px;
      }
      .next-btn:hover {
        background: #c81623;
      }
      .reg-btn:hover {
        color: #c81623;
      }
      .phone-btn:hover {
        border-color: #666;
      }
      .validate-group:hover .address,
      .validate-group:hover .phone {
        border-color: #666;
      }
      .enterprise {
        cursor: pointer;
      }
      .icon {
        float: left;
        width: 26px;
        height: 26px;
        margin-right: 8px;
        background-image: url("https://misc.360buyimg.com/user/reg/3.0.0/css/i/reg-icon.png");
        background-repeat: no-repeat;
        background-position: 0 -160px;
      }
      .enterprise-text {
        float: left;
        height: 26px;
        line-height: 26px;
        font-size: 14px;
      }
      .international {
        float: right;
        cursor: pointer;
      }
      .international-icon {
        float: left;
        width: 26px;
        height: 26px;
        margin-right: 8px;
        background-image: url("https://misc.360buyimg.com/user/reg/3.0.0/css/i/reg-icon.png");
        background-repeat: no-repeat;
        background-position: -40px -160px;
      }
      .international-text {
        float: left;
        height: 26px;
        line-height: 26px;
        font-size: 14px;
      }
      .reg-channel {
        float: left;
        width: 440px;
        height: 50px;
      }
    }
    .username-text {
      width: 107px;
      height: 54px;
      line-height: 54px;

      font-size: 14px;
      padding-left: 20px;
      color: #666;
    }
    .username-input {
      padding-left: 20px;
      font-size: 14px;
    }
    .username {
      float: left;
      width: 440px;
      height: 53px;
      border: 1px solid #ddd;
    }
    .message-box {
      float: left;
      height: 86px;
    }
    input::-webkit-input-placeholder {
      color: #ccc;
    }
    .code {
      width: 172px;
    }
    .code-box {
      width: 330px;
    }
    .code-btn {
      width: 110px;
      height: 53px;
      color: #333;
      background-color: white;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
    }
  }
</style>

