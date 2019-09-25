<template>
  <div class="modify">
    <div class="modify-title">修改登录密码</div>
    <ul class="modify-list">
      <li>
        <div class="modify-text">登录密码</div>
        <div class="modify-input">
          <el-input v-model="passWord" type="password"></el-input>
        </div>
      </li>
      <li>
        <div class="modify-text">确认登录密码</div>
        <div class="modify-input">
          <el-input v-model="confirmPassWord" type="password"></el-input>
        </div>
      </li>
      <li v-if="false">
        <div class="modify-text">短信通知会员</div>
        <div class="modify-input">
          <el-switch v-model="sendPassWord" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </div>
      </li>
      <li class="modify-buttom">
        <div class="modify-text"></div>
        <div class="modify-input">
          <el-button @click="save(1)" type="primary">修改登录密码</el-button>
        </div>
      </li>
    </ul>
    <div class="modify-title">修改支付密码</div>
    <ul class="modify-list">
      <li>
        <div class="modify-text">支付密码</div>
        <div class="modify-input">
          <el-input type="password" v-model="payPassWord"></el-input>
          <div>支付密码必须为6为数字</div>
        </div>
      </li>
      <li>
        <div class="modify-text">确认支付密码</div>
        <div class="modify-input">
          <el-input type="password" v-model="payConfirmPassWord"></el-input>
        </div>
      </li>
      <li v-if="false">
        <div class="modify-text">短信通知会员</div>
        <div class="modify-input">
          <el-switch v-model="paySendPassWord" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </div>
      </li>
      <li class="modify-buttom">
        <div class="modify-text"></div>
        <div class="modify-input">
          <el-button @click="save(2)" type="primary">修改支付密码</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        passWord: '',
        confirmPassWord: '',
        sendPassWord: true,
        payPassWord: '',
        payConfirmPassWord: '',
        paySendPassWord: true
      }
    },
    methods: {
      async save (type) {
        var data = {
          EditUserId: this.$route.query.id,
          type: '',
          passWord: '',
          confirmPassWord: '',
          sendPassWord: false,
          LoginUserId: this.$user.id()
        }
        if (type === 1) {
          data.type = 1
          data.passWord = this.passWord
          data.confirmPassWord = this.confirmPassWord
          data.sendPassWord = this.sendPassWord
        } else {
          data.type = 2
          data.passWord = this.payPassWord
          data.confirmPassWord = this.payConfirmPassWord
          data.sendPassWord = this.paySendPassWord
        }
        var res = await this.$api.httpPost('/Api/UserAdmin/UpdatePassword', data)
        this.$crud.message(this, res)
      }
    }
  }
</script>



<style lang="scss" scoped>
  @import "./styles/modify.scss";
</style>
