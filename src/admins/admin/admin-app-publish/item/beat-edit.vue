<template>
  <div class="alipay-edit">
    <div class="apple-edit_box">
      <div class="apple-edit_list">
        <div class="apple-edit_left">小程序绑定</div>
        <div class="apple-edit_center">
          <p class="apple-edit_center-p">绑定设置字节跳动小程序APPID、AppSecret等，如无小程序请<span class="apple-edit_center-span">注册</span></p>
        </div>
        <div class="apple-edit_right">
          <div class="apple-edit_buttom" @click="getDialog(1)">绑定</div>
        </div>
      </div>
      <div class="apple-edit_list">
        <div class="apple-edit_left">小程序支付配置</div>
        <div class="apple-edit_center">
          <p class="apple-edit_center-p">设字节跳动小程序支付app_id、支付秘钥secret和商户号（merchant_id）等</p>
        </div>
        <div class="apple-edit_right">
          <div class="apple-edit_buttom" @click="getDialog(2)">配置</div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <div class="admin-app-publish_dialog" v-if="dialogInde==1">
        <el-form label-width="150px" size="medium">
          <el-form-item label="AppID(头条小程序ID)">
            <el-input v-model="viewModel.id" placeholder="请输入AppID(头条小程序ID)"></el-input>
            <div class="app-publish_intro">AppID(头条小程序ID)</div>
          </el-form-item>
          <el-form-item label="AppSecret(头条小程序密钥)">
            <el-input v-model="viewModel.appId" placeholder="请输入AppSecret"></el-input>
            <div class="app-publish_intro">AppSecret(头条小程序密钥)</div>
          </el-form-item>
        </el-form>
      </div>
      <div class="admin-app-publish_dialog" v-if="dialogInde==2">
        <el-form label-width="150px" size="medium">
          <el-form-item label="支付app_id">
            <el-input v-model="viewModel.id" placeholder="请输入支付app_id"></el-input>
            <div class="app-publish_intro">支付app_id</div>
          </el-form-item>
          <el-form-item label="支付秘钥secret">
            <el-input v-model="viewModel.appId" placeholder="请输入支付秘钥secret"></el-input>
            <div class="app-publish_intro">支付秘钥secret</div>
          </el-form-item>
          <el-form-item label="商户号（merchant_id）">
            <el-input v-model="viewModel.appSecret" placeholder="请输入商户号（merchant_id）"></el-input>
            <div class="app-publish_intro">商户号（merchant_id）</div>
          </el-form-item>
          <el-form-item label="支付宝app_id">
            <el-input v-model="viewModel.id" placeholder="请输入支付宝app_id"></el-input>
            <div class="app-publish_intro">支付宝app_id</div>
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
        viewModel: {},
        dialogInde: null
      }
    },
    mounted () { },
    methods: {
      getDialog (val) {
        this.dialogVisible = true
        this.dialogInde = val
      }
    }
  }
</script>
