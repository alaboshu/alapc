<template>
  <x-border title="财务详情" type="danger" icon="flaticon-bag">
    <div class="account-details" v-if="viewModel">
      <div class="account-card">
        <ul>
          <li v-for="(item,index) in viewModel.accountList" :key="index" :title="item.moneyTypeName">
            <p class="p1">{{item.amount}}</p>
            <p class="p2" v-if="true">冻结：{{item.freezeAmount}}</p>
            <p class="p3">{{item.moneyTypeName}}</p>
          </li>
        </ul>
      </div>
      <x-line :border="true" title="资产操作" type="primary" icon="flaticon-interface-4" style="padding-bottom: 10px;">
      </x-line>
      <div class="assets-operation">
        <el-form>
          <el-form-item label="用户信息">
            <div class="form-open_text">{{viewModel.user.userName}}({{viewModel.user.name}})</div>
          </el-form-item>
          <el-form-item label="操作类型" :required="true">
            <x-radio v-model="viewModel.actionType" type="FinanceActionType"></x-radio>
            <div class="form-open_intro">请选择操作类型</div>
          </el-form-item>
          <el-form-item label="货币类型" :required="true">
            <x-radio v-model="viewModel.moneyTypeId" type="MoneyTypeConfig"></x-radio>
            <div class="form-open_intro">请选择货币类型，默认选中现金资产</div>
          </el-form-item>
          <el-form-item label="金额" :required="true">
            <el-input-number :max="1000000" :min="0" :precision="2" :step="1" v-model="viewModel.amount" class="form-open_input"></el-input-number>
            <div class="form-open_intro">请输入正确的金额格式，如200.00,每次最高充值金额100万</div>
          </el-form-item>
          <el-form-item label="支付密码" :required="true">
            <el-input class="form-open_input" type="password" v-model="viewModel.payPassword"></el-input>
            <div class="form-open_intro">请输入当前管理员的安全密码(支付密码)，才能够进行操作</div>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="viewModel.remark" class="form-open_input"></el-input>
            <div class="form-open_intro">请输入备注</div>
          </el-form-item>
        </el-form>
      </div>
      <div class="role-foot">
        <div class="role-foot_right" @click="save">保存</div>
      </div>
    </div>
  </x-border>
</template>
<script>
  export default {
    props: {
      widgetData: {}
    },
    data () {
      return {
        viewModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var paras = {
          id: this.$route.query.id
        }
        var repone = await this.$api.httpGet('/Api/Account/DetailEdit', paras)
        if (repone.status !== 1) {
          this.$api.toastWarn(repone.messgae)
          return
        }
        this.viewModel = repone.result
        this.viewModel.actionType = 1
      },
      async save () {
        var response = await this.$api.httpPost('/Api/Account/action', this.viewModel)
        this.$crud.message(response)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./styles/style.scss";
</style>
