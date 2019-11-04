<template>
  <div class="modify">
    <x-line title="修改登录密码" style="margin-bottom:20px"></x-line>
    <el-form ref="form">
      <el-form-item label="登录密码">
        <el-input v-model="passWord" type="password"></el-input>
        <div class="modify-user-base-tips">请输入新的登录密码</div>
      </el-form-item>
      <el-form-item label="确认登录密码">
        <el-input v-model="confirmPassWord" type="password"></el-input>
        <div class="modify-user-base-tips">请确认登录密码</div>
      </el-form-item>
      <el-form-item label="短信通知会员">
        <el-switch v-model="sendPassWord" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
        <div class="modify-user-base-tips">请选择是否短信通知会员</div>
      </el-form-item>
      <el-form-item size="large" label-width="240px">
        <el-button @click="save(1)" type="primary">修改登录密码</el-button>
      </el-form-item>
    </el-form>
    <x-line title="修改支付密码" style="margin-bottom:20px"></x-line>
    <el-form ref="form">
      <el-form-item label="支付密码">
        <el-input type="password" v-model="payPassWord"></el-input>
        <div class="modify-user-base-tips">请输入新的支付密码，支付密码必须为6为数字</div>
      </el-form-item>
      <el-form-item label="确认支付密码">
        <el-input type="password" v-model="payConfirmPassWord"></el-input>
        <div class="modify-user-base-tips">请确认支付密码，支付密码必须为6为数字</div>
      </el-form-item>
      <el-form-item label="短信通知会员">
        <el-switch v-model="paySendPassWord" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
        <div class="modify-user-base-tips">请选择是否短信通知会员</div>
      </el-form-item>
      <el-form-item size="large" label-width="240px">
        <el-button @click="save(2)" type="primary">修改支付密码</el-button>
      </el-form-item>
    </el-form>

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
        this.$crud.message(res)
      }
    }
  }
</script>



<style lang="scss" scoped>
  .modify {
    padding: 20px;
    padding-left: 0px;
  }
  .modify-title {
    margin: 20px 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    color: #7b7e8a !important;
    border-radius: 3px;
    border-bottom: 1px solid #c0c4cc;
  }
  .modify-user-base-tips {
    height: 20px;
    line-height: 20px;
  }
</style>
