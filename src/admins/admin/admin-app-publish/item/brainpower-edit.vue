<template>
  <div class="alipay-edit">
    <div class="apple-edit_box">
      <div class="apple-edit_list">
        <div class="apple-edit_left">百度小程序绑定</div>
        <div class="apple-edit_center">
          <p class="apple-edit_center-p">绑定设置百度智能小程序原始id、appid、appsecret等，如无小程序请<span class="apple-edit_center-span">注册</span></p>
        </div>
        <div class="apple-edit_right">
          <div class="apple-edit_buttom" @click="getDialog(1)">绑定</div>
        </div>
      </div>
      <div class="apple-edit_list">
        <div class="apple-edit_left">百度支付配置</div>
        <div class="apple-edit_center">
          <p class="apple-edit_center-p">设置百度智能小程序dealId、appKey、平台公钥、平台私钥等</p>
        </div>
        <div class="apple-edit_right">
          <div class="apple-edit_buttom" @click="getDialog(2)">配置</div>
        </div>
      </div>
      <div class="apple-edit_list">
        <div class="apple-edit_left">百度搜索配置</div>
        <div class="apple-edit_center">
          <p class="apple-edit_center-p">设置百度智能小程序页面标题、关键字、描述信息</p>
        </div>
        <div class="apple-edit_right">
          <div class="apple-edit_buttom" @click="getDialog(3)">配置</div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <div class="admin-app-publish_dialog" v-if="dialogInde==1">
        <el-form label-width="150px" size="medium">
          <el-form-item label="App ID(智能小程序ID)">
            <el-input v-model="viewModel.id" placeholder="请输入小程序ID"></el-input>
            <div class="app-publish_intro">App ID(智能小程序ID)</div>
          </el-form-item>
          <el-form-item label="App key">
            <el-input v-model="viewModel.appId" placeholder="请输入key"></el-input>
            <div class="app-publish_intro">App key</div>
          </el-form-item>
          <el-form-item label="APP Secret(智能小程序秘钥)">
            <el-input v-model="viewModel.appSecret" placeholder="请输入AppSecret"></el-input>
            <div class="app-publish_intro">APP Secret(智能小程序秘钥)</div>
          </el-form-item>
        </el-form>
      </div>
      <div class="admin-app-publish_dialog" v-if="dialogInde==2">
        <el-form label-width="150px" size="medium">
          <el-form-item label="百度dealId">
            <el-input v-model="viewModel.id" placeholder="请输入百度dealId"></el-input>
            <div class="app-publish_intro">百度dealId</div>
          </el-form-item>
          <el-form-item label="百度appKey">
            <el-input v-model="viewModel.appId" placeholder="请输入百度appKey"></el-input>
            <div class="app-publish_intro">百度appKey</div>
          </el-form-item>
          <el-form-item label="百度平台公钥">
            <el-input v-model="viewModel.appSecret" placeholder="请输入百度平台公钥"></el-input>
            <div class="app-publish_intro">百度平台公钥</div>
          </el-form-item>
          <el-form-item label="百度平台私钥">
            <el-input v-model="viewModel.appSecret" placeholder="请输入百度平台私钥"></el-input>
            <div class="app-publish_intro">百度平台私钥</div>
          </el-form-item>
        </el-form>
      </div>
      <div class="admin-app-publish_dialog" v-if="dialogInde==3">
        <el-form label-width="150px" size="medium">
          <el-form-item label="标题">
            <el-input v-model="viewModel.id" placeholder="请输入标题"></el-input>
            <div class="app-publish_intro">标题</div>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="viewModel.appId" placeholder="请输入关键字"></el-input>
            <div class="app-publish_intro">如有多个关键字，请以逗号间隔</div>
          </el-form-item>
          <el-form-item label="描述信息">
            <el-input type="textarea" v-model="viewModel.appSecret" placeholder="请输入描述信息"></el-input>
            <div class="app-publish_intro">描述信息</div>
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
