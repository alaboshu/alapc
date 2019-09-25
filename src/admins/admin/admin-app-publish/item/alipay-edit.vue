<template>
  <div class="alipay-edit">
    <div class="apple-edit_box">
      <div class="apple-edit_list">
        <div class="apple-edit_left">支付宝小程序绑定</div>
        <div class="apple-edit_center">
          <p class="apple-edit_center-p">绑定设置支付宝小程序原始id、appid、appsecret等，如无小程序请<span class="apple-edit_center-span">注册</span></p>
        </div>
        <div class="apple-edit_right">
          <div class="apple-edit_buttom" @click="dialogVisible = true">绑定</div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <div class="admin-app-publish_dialog">
        <el-form label-width="150px" size="medium">
          <el-form-item label="appid">
            <el-input v-model="viewModel.id" placeholder="请输入appid"></el-input>
            <div class="app-publish_intro">登陆小程序后台（open.alipay.com）</div>
          </el-form-item>
          <el-form-item label="支付宝公钥">
            <el-input v-model="viewModel.appId" placeholder="请输入支付宝公钥"></el-input>
            <div class="app-publish_intro">支付宝公钥</div>
          </el-form-item>
          <el-form-item label="应用私钥">
            <el-input v-model="viewModel.appSecret" placeholder="请输入应用私钥"></el-input>
            <div class="app-publish_intro">应用私钥</div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">立即绑定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import './style.scss'
  export default {
    data () {
      return {
        dialogVisible: false,
        viewModel: {}
      }
    }
  }
</script>
