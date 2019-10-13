<template>
  <x-border title="财务详情" type="danger" icon="flaticon-bag">
    <div class="account-details" v-if="viewModel">
      <div class="account-card">
        <ul>
          <li v-for="(item,index) in viewModel.accountList" :key="index">
            <p class="p1">{{item.amount}}</p>
            <p class="p2"></p>
            <!-- <p class="p2" v-if="true">冻结：{{item.freezeAmount}}</p> -->
            <p class="p3">{{item.moneyName}}</p>
          </li>
        </ul>
      </div>
      <x-line :border="true" title="资产操作" type="primary" icon="flaticon-interface-4">
        <div class="assets-operation">
          <el-form :model="ruleForm" label-width="200px" size="medium" class="form-open">
            <el-form-item label="用户信息">
              <div class="form-open_text">{{viewModel.user.userName}}</div>
            </el-form-item>
            <el-form-item label="操作类型" :required="true">
              <x-radio v-model="viewModel.actionType" :widget="finaModel"></x-radio>
            </el-form-item>
            <el-form-item label="货币类型" :required="true">
              <x-radio v-model="viewModel.moneyTypeId" :widget="moneyModel"></x-radio>
            </el-form-item>
            <el-form-item label="金额" :required="true">
              <el-input v-model="viewModel.amount" class="form-open_input"></el-input>
              <div class="form-open_intro">请输入正确的金额格式，如200.00</div>
            </el-form-item>
            <el-form-item label="支付密码" :required="true">
              <el-input class="form-open_input" v-model="viewModel.adminPayPassword"></el-input>
              <div class="form-open_intro">请输入当前管理员的安全密码(支付密码)，才能够进行操作</div>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="viewModel.remark" class="form-open_input"></el-input>
              <div class="form-open_intro">请输入备注</div>
            </el-form-item>
          </el-form>
        </div>
      </x-line>
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
        ruleForm: {
          name: '',
          region: '',
          resource: false
        },
        radio2: 1,
        radio3: 1,
        obj: {
          radio1: 0,
          radio2: 'e97ccd1e-1478-49bd-bfc7-e73a5d699005'
        },
        viewModel: '',
        finaModel: {
          tenant: this.widgetData.tenant,
          dataSource: '/Api/Type/GetKeyValue?type=FinanceActionType'
        },
        moneyModel: {
          tenant: this.widgetData.tenant,
          dataSource: '/Api/Type/GetKeyValue?type=MoneyTypeConfig'
        }
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
      },
      async save () {
        var para = {
          userId: this.$user.loginUser(true).id,
          chargeUserId: this.$route.query.id,
          actionType: this.viewModel.actionType,
          moneyTypeId: this.viewModel.moneyTypeId,
          amount: this.viewModel.amount,
          adminPayPassword: this.viewModel.adminPayPassword,
          remark: this.viewModel.remark
        }
        var repones = await this.$api.httpPost('/Api/Account/DetailEdit', para)
        if (repones.status === 1) {
          this.$confirm(repones.message + ', 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            center: true
          }).then(() => {

          }).catch(() => {
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: repones.message,
            position: 'bottom-right'
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./styles/style.scss";
</style>
