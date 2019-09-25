<template>
  <div class="apple-edit">
    <div class="apple-edit_box">
      <div class="apple-edit_list">
        <div class="apple-edit_left">微信小程序绑定</div>
        <div class="apple-edit_center">
          <p class="apple-edit_center-p">小程序原始ID：gh_00000000000000007</p>
          <p class="apple-edit_center-p">小程序AppID：wxtyhssdasdasdasdsd</p>
          <p class="apple-edit_center-p">小程序AppSecret：wxtyhssdasdasdasdsd</p>
        </div>
        <div class="apple-edit_right">
          <div class="apple-edit_buttom" @click="getDialog(1)">修改</div>
        </div>
      </div>
      <div class="apple-edit_list">
        <div class="apple-edit_left">微信支付配置</div>
        <div class="apple-edit_center">
          <p class="apple-edit_center-p">友情提示：请登录微信公众平台（小程序平台），在微信支付中开启支付功能</p>
        </div>
        <div class="apple-edit_right">
          <div class="apple-edit_buttom" @click="getDialog(2)">配置</div>
        </div>
      </div>
      <div class="apple-edit_list">
        <div class="apple-edit_left">客服信息</div>
        <div class="apple-edit_center">
          <p class="apple-edit_center-p">URL(服务器地址)：https://gjashdgsgd/sghdhasgdhasgdahsdgahsdgasgdgsadgasgdgasd</p>
          <p class="apple-edit_center-p">Token(令牌)：weixi0000000009 </p>
          <p class="apple-edit_center-p">消息加密方式：兼容模式（明文、密文将共存，方便开发者调试和维护）</p>
          <p class="apple-edit_center-p">数据格式：JSON</p>
        </div>
        <div class="apple-edit_right">
          <div class="apple-edit_buttom">打开配置</div>
        </div>
      </div>
      <div class="apple-edit_list">
        <div class="apple-edit_left">小程序跳转AppID</div>
        <div class="apple-edit_center">
          <p class="apple-edit_center-p">友情提示：请填写需要跳转的小程序AppID，最多可配置10个小程序！</p>
        </div>
        <div class="apple-edit_right">
          <div class="apple-edit_buttom" @click="getDialog(3)">修改</div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <div class="admin-app-publish_dialog" v-if="dialogInde==1">
        <el-form label-width="140px" size="medium">
          <el-form-item label="原始ID">
            <el-input v-model="viewModel.id" placeholder="请输入原始ID"></el-input>
            <div class="app-publish_intro">登陆小程序后台（mp.weixi.qq.com）--设置--基本设置--原始ID('gh_'开头15位字符)</div>
          </el-form-item>
          <el-form-item label="appid">
            <el-input v-model="viewModel.appId" placeholder="请输入appid"></el-input>
            <div class="app-publish_intro">登陆小程序后台（mp.weixi.qq.com）--开发--开发设置--AppID('wx'开头18位字符)</div>
          </el-form-item>
          <el-form-item label="AppSecret">
            <el-input v-model="viewModel.appSecret" placeholder="请输入AppSecret"></el-input>
            <div class="app-publish_intro">登陆小程序后台（mp.weixi.qq.com）--开发--开发设置--AppSecret</div>
          </el-form-item>
        </el-form>
      </div>
      <div class="admin-app-publish_dialog" v-if="dialogInde==2">
        <el-form label-width="140px" size="medium">
          <el-form-item label="AppID">
            <el-input v-model="viewModel.id" placeholder="小程序的AppID"></el-input>
          </el-form-item>
          <el-form-item label="AppSecret">
            <el-input v-model="viewModel.appId" placeholder="小程序的密匙"></el-input>
          </el-form-item>
          <el-form-item label="支付密钥">
            <el-input type="textarea" v-model="viewModel.appSecret" placeholder="PartnerKey | 32位"></el-input>
          </el-form-item>
          <el-form-item label="微信支付商户号 （10位）">
            <el-input v-model="viewModel.appSecret" placeholder="PartnerKey | 32位"></el-input>
          </el-form-item>
          <el-form-item label="上传证书">
            <el-input v-model="viewModel.appSecret" placeholder="上传证书"></el-input>
          </el-form-item>
          <el-form-item label="上传密匙">
            <el-input v-model="viewModel.appSecret" placeholder="上传密匙"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="admin-app-publish_dialog" v-if="dialogInde==3">
        <el-form label-width="140px" size="medium">
          <el-form-item label="AppId" :required="true">
            <div class="publish_dialog-li" v-for="(item,index) in appidList" :key="index" :class="{'is-one':appidList.length==1,'is-two':appidList.length>1}">
              <el-input v-model="item.id" placeholder="小程序的AppID"></el-input>
              <div class="publish_dialog-icon">
                <i class="el-icon-circle-plus-outline" @click="publishAdd"></i>
                <i class="el-icon-remove-outline" @click="publishDelete(index)"></i>
              </div>
            </div>
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
        appidList: [
          { id: '' }
        ],
        dialogInde: null,
        addFool: true,
        deleteFool: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
      },
      publishAdd () {
        if (this.appidList.length >= 10) {
          this.$message.error('最多只能添加10条')
          return
        }
        this.appidList.push({ id: '' })
      },
      publishDelete (index) {
        this.appidList.splice(index, 1)
      },
      getDialog (val) {
        this.dialogVisible = true
        this.dialogInde = val
      }
    }
  }
</script>
