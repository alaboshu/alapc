<template>
  <div class="zk-top-nav">
    <div class="top-nav_box">
      <div class="top-nav_left">
        <ul class="left_box">
          <li class="left_box_li">
            <x-icon src="alert1" size="12"></x-icon>
          </li>
          <li class="left_box_li">欢迎来到匠芯云
            <router-link to="/user/login" v-if="isLoginUser" class="login-link left_box_a">
              请登录
            </router-link>
            <router-link to="/user/reg" v-if="isLoginUser" class="reg-link left_box_a">
              免费注册
            </router-link>
            <router-link to="/user/index" v-if="!isLoginUser" class="user-name left_box_a">
              {{lUser.name}}
            </router-link>
            <span v-if="!isLoginUser" @click="removeLoginUser" class="login-out left_box_a">
              退出登录
            </span>
          </li>
        </ul>
      </div>
      <div class="top-nav_right">
        <ul class="right_box">
          <li class="li nav_right_li ">
            <router-link class="li-a" to="/index">首页</router-link>
          </li>
          <li class="right_box-li li">
            <router-link to="/user/index" class="pull-down li-a">会员中心
              <x-icon class="rotating" :pdisplay="pdisplay" src="zk-arrowsDownsmall" size="12"></x-icon>
            </router-link>
            <!-- <div class="disblok">
                <ul class="disblok-ul">
                  <li class="disblok-ul_li">
                    <router-link   to="/user/add">注册会员</router-link>
                  </li>
                </ul>
              </div> -->
          </li>
          <li class="right_box-li li">
            <router-link to="/order/index" class="pull-down li-a">订单中心
              <x-icon class="rotating" :pdisplay="pdisplay" src="zk-arrowsDownsmall" size="12"></x-icon>
            </router-link>
            <!-- <div class="disblok">
                <ul class="disblok-ul">
                  <li class="disblok-ul_li">
                    <router-link   to="">敬请期待</router-link>
                  </li>
                </ul>
              </div> -->
          </li>
          <!-- <li class="right_box-li li">
              <router-link   to="/user/favarite/index" class="pull-down li-a">我的收藏
                <x-icon class="rotating" :pdisplay="pdisplay" src="zk-arrowsDownsmall" size="12"></x-icon>
              </router-link>
              <div class="disblok">
                <ul class="disblok-ul">
                  <li class="disblok-ul_li">
                    <router-link   to="">敬请期待</router-link>
                  </li>
                </ul>
              </div>
            </li> -->
          <li class="right_box-li li">
            <router-link to="/articles/help/index" class="pull-down li-a">帮助中心
              <x-icon class="rotating" :pdisplay="pdisplay" src="zk-arrowsDownsmall" size="12"></x-icon>
            </router-link>
            <!-- <div class="disblok">
                <ul class="disblok-ul">
                  <li class="disblok-ul_li">
                    <router-link   to="">敬请期待</router-link>
                  </li>
                </ul>
              </div> -->
          </li>
          <li class="right_box-li li">
            <router-link to="/articles/topline/index" class="pull-down li-a">头条
              <x-icon class="rotating" :pdisplay="pdisplay" src="zk-arrowsDownsmall" size="12"></x-icon>
            </router-link>
            <!-- <div class="disblok">
                <ul class="disblok-ul">
                  <li class="disblok-ul_li">
                    <router-link   to="">敬请期待</router-link>
                  </li>
                </ul>
              </div> -->
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- 收货地址 -->
  <!-- <div class="shipping-address">
    <div class="address-title">收货地址</div>
    <div class="new-address">新增收货地址</div>
    <div class="distribution">
      <div class="distribution-h6">
        <span class="distribution-h6_span">当前配送至</span>中国大陆</div>
      <div class="theform">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
          <el-form-item label="地址信息：" prop="address
            <el-select v-model="ruleForm.address" placeholder="请选择省/市/区/街道">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址：" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"></el-input>
          </el-form-item>
          <el-form-item label="收货人姓名：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="长度不超过25个字符"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" required>
            <el-col :span="10" prop="region">
              <el-form-item>
                <el-select class="inputs" v-model="ruleForm.region">
                  <el-option label="中国大陆 +86" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item prop="phone">
                <el-input v-model="ruleForm.phone " placeholder="电话号码、手机号码必须填一项 "></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label=" " prop="type ">
            <el-checkbox-group class="checkbox" v-model="ruleForm.type ">
              <el-checkbox label="设置为默认收货地址" name="type "></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary " @click="submitForm( 'ruleForm') ">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div>
      <table class="table" border="0" cellspacing="0" cellpadding="0">
        <thead class="table-thead">
          <tr>
            <th>
              <div class="th-div1">收货人</div>
            </th>
            <th>
              <div class="th-div2">所在地区</div>
            </th>
            <th>
              <div class="th-div3">详细地址</div>
            </th>
            <th>
              <div class="th-div4">邮编</div>
            </th>
            <th>
              <div class="th-div5">电话/手机</div>
            </th>
            <th>
              <div class="th-div6">操作</div>
            </th>
            <th>
              <div class="th-div7"></div>
            </th>
          </tr>
        </thead>
        <tr class="list-tr">
          <td>
            <div>李某某</div>
          </td>
          <td>
            <div>广西壮族自治区 南宁市 青秀区 南湖街道</div>
          </td>
          <td>
            <div>广西壮族自治区南宁市青秀区南湖琅西菜市场一组5栋5号</div>
          </td>
          <td>
            <div>6768678</div>
          </td>
          <td>
            <div>86-18254865257</div>
          </td>
          <td>
            <div class="modify-box">
              <router-link  >修改</router-link>|
              <router-link  >删除</router-link>
            </div>
          </td>
          <td>
            <div class="set-to">设为默认</div>
            <div class="default">
              <router-link  >默认地址</router-link>
            </div>
            <div class="upgrade">
              <router-link   to="">升级地址</router-link>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div> -->

</template>

<script>

  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        widgetModel: '',
        qwe: '798',
        pdisplay: true,
        lUser: '',
        isLoginUser: true,
        ruleForm: {
          address: '',
          type: [],
          name: '',
          region: '中国大陆 +86',
          phone: '',
          desc: ''
        },
        rules: {
          address: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '名字不能为空', trigger: 'blur' },
            { max: 3, message: '长度在 3 个字符之内', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '详细地址不能为空', trigger: 'blur' }
          ],
          region: [],
          phone: [
            { required: true, message: '电话号码不能为空', trigger: 'blur' },
            { min: 11, message: '格式不正确', trigger: 'blur' }
          ]
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
        if (!this.$user.isLogin()) {
          this.isLoginUser = true
        } else {
          this.isLoginUser = false
          // this.lUser = this.$api.localGet(this.$user.userKey())
          this.lUser = this.$user.loginUser()
        }
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      removeLoginUser () {
        this.$api.vuexSet('loginUser', null)
        this.$api.vuexSet('loginUserTenant', null)
        this.$api.localRemove(this.$user.userKey())
        window.location.reload()
      },
      submitForm (forName) {
      }
    }
  }
</script>

<style   lang="scss">
  @import "~_style/index.scss";

  .zk-top-nav {
    width: 100%;
    height: 40px;
    border-top: 1px solid #f2f6fc;
    border-bottom: 1px solid #dcdfe6;
    background: #333;
    .top-nav_box {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      .top-nav_left {
        .left_box {
          height: 100%;
          display: flex;
          align-items: center;
          .left_box_a:hover {
            text-decoration: underline;
          }
          .left_box_li {
            position: relative;
            font-size: 12px;
            color: #ccc;
            padding-left: 10px;
          }
          .left_box_li:after {
            content: "";
            display: block;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 12px;
            background: #b6b4b6;
          }
          .left_box_li:last-child:after {
            content: none;
          }
          .left_login,
          .left_reg {
            margin-left: 5px;
            font-size: 12px;
            color: #ccc;
          }
          .left_login:hover,
          .left_reg:hover {
            color: $gl-brand;
            border-bottom: 1px solid $gl-brand;
          }
        }
      }
      .login-link {
        color: $gl-brand;
        margin-left: 3px;
        padding: 0 5px;
      }
      .reg-link {
        color: #ccc;
        padding: 0 5px;
      }
      .login-out {
        color: #ccc;
        padding: 0 5px;
        cursor: pointer;
      }
      .user-name {
        color: $gl-brand;
      }
      .top-nav_right {
        flex: 1;
        .right_box {
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .li {
            position: relative;
            height: 100%;
            height: 32px;
            line-height: 30px;
            margin-bottom: -1px;
            cursor: pointer;
            .li-a {
              display: block;
              font-size: 12px;
              padding: 0 10px;
              color: #ccc;
              .rotating {
                transition: all 0.3s;
              }
            }
          }
          .li:hover .rotating {
            transform: rotate(-180deg);
          }
          .li:hover .li-a {
            color: $gl-themeColor;
          }
          .li:last-child:after {
            content: none;
          }
          .li:after {
            content: "";
            display: block;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 12px;
            background: #b6b4b6;
          }
        }
      }
    }
  }

  .li:hover .disblok {
    display: block;
  }
  .disblok {
    display: none;
    width: 110px;
    background-color: $gl-light;
    border: 1px solid #dcdfe6;
    border-top: none;
    position: absolute;
    top: 30px;
    left: -1px;
    text-align: center;
    padding: 10px 0px;
    .disblok-ul {
      .disblok-ul_li {
        line-height: 22px;
        padding: 0px;
      }
      .disblok-ul_li:hover a {
        color: $gl-brand;
        text-decoration: underline;
      }
    }
  }

  // 收货地址页面
  .shipping-address {
    width: 850px;
    margin: 0 auto;
  }
  .address-title {
    width: 100%;
    padding: 6px 15px;
    background-color: $gl-light-info;
    color: #014d7f;
    font-size: 14px;
  }
  .new-address {
    color: #ffb822;
    padding: 0px 18px;
    margin: 20px 0px;
  }
  .distribution {
    width: 450px;
    padding-left: 10px;
  }
  .distribution-h6 {
    padding: 6px 15px;
    background-color: #f8f8f8;
    border-radius: 3px;
  }
  .distribution-h6_span {
    color: #909399;
    margin-right: 15px;
  }
  .theform {
    padding: 10px 10px;
  }
  .el-form-item__label {
    font-size: 12px;
    padding: 0px 2px 0px 0px;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-select {
    width: 100%;
    font-size: 12px;
  }
  .el-input__inner {
    height: 30px;
    line-height: 30px;
    padding: 0px 15px;
  }
  .el-textarea__inner {
    resize: none;
    font-size: 12px;
    line-height: 14px;
    padding: 6px 5px;
  }
  .el-input {
    font-size: 12px;
  }
  .inputs {
    padding-right: 5px;
  }
  .el-checkbox__label {
    font-size: 12px;
  }
  .el-button {
    padding: 10px;
  }
  .checkbox {
    line-height: 10px;
  }
  .table {
    width: 850px;
    border-top: 1px solid #dcdee3;
    border-left: 1px solid #dcdee3;
  }
  .table-thead > tr {
    background-color: #ebecf0;
  }
  .table-thead > tr > th {
    border-right: 1px solid #dcdee3;
    border-bottom: 1px solid #dcdee3;
  }
  .table-thead > tr > th > div {
    padding: 10px 16px;
    text-align: left;
  }
  .th-div1 {
    width: 70px;
    text-align: center;
  }
  .th-div2 {
    width: 130px;
  }
  .th-div3 {
    width: 180px;
  }
  .th-div4 {
    width: 110px;
  }
  .th-div5 {
    width: 140px;
  }
  .th-div6 {
    width: 110px;
  }
  .th-div7 {
    width: 110px;
  }
  .list-tr > td {
    border-right: 1px solid #dcdee3;
    border-bottom: 1px solid #dcdee3;
  }
  .list-tr:hover {
    background-color: #ebecf0;
  }
  .list-tr > td > div {
    padding: 20px 16px;
  }
  .modify-box > a {
    display: inline-block;
    padding: 0px 5px;
    cursor: pointer;
  }
  .modify-box > a:hover {
    color: $gl-brand;
  }
  .set-to {
    cursor: pointer;
  }
  .set-to:hover {
    color: $gl-brand;
  }
  .default > a {
    display: inline-block;
    padding: 5px 14px;
    border-radius: 4px;
    border: 1px solid $gl-brand;
    color: $gl-brand;
    background-color: #ffb822;
  }
  .upgrade > a {
    display: inline-block;
    padding: 5px 14px;
    border-radius: 4px;
    border: 1px solid $gl-brand;
    color: $gl-light;
    background-color: $gl-brand;
  }
  .upgrade > a:hover {
    text-decoration: underline;
  }
</style>
