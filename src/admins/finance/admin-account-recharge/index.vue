<template>
  <div class="admin-account-recharge" v-loading="loading">
    <x-border title="我的钱包" type="brand" icon="flaticon-bag">
      <div class="account-wallet">
        <div class="account-card">
          <ul>
            <li v-for="(item,index) in viewModel.accountList" :key="index">
              <p class="p1">{{item.amount}}</p>
              <p class="p2"></p>
              <p class="p2" v-if="false">冻结：{{item.freezeAmount}}</p>
              <p class="p3">{{item.moneyName}}</p>
            </li>
          </ul>
        </div>
      </div>
    </x-border>
    <div class="admin-account-recharge-undel">
      <x-border title="储值充值" type="brand" icon="flaticon-bag">
        <div class="admin-account-recharge-from">
          <el-form label-width="250px" :model="formLabelAlign" placeholder="fjsdakflak ">
            <el-form-item label="金额">
              <el-input-number v-model="formLabelAlign.money" :min="0" controls-position="right"></el-input-number>
              <div class="from-tips">请输入充值金额</div>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-radio-group v-model="formLabelAlign.type">
                <el-radio :label="2">支付宝</el-radio>
              </el-radio-group>
              <div class="from-tips">支付宝充值</div>
            </el-form-item>
            <el-form-item>
              <div class="admin-account-recharge-button" @click="saveTips">提交</div>
            </el-form-item>
          </el-form>
        </div>
      </x-border>
      <el-dialog title="支付" width="1000px" :visible.sync="dialogTableVisible">
        <zk-pay ref="show_pay"></zk-pay>
        <div slot="footer" class="dialog-footer">
          <el-button class="foot-button" @click="dialogTableVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

 <script>
  export default {
    data () {
      return {
        viewModel: '',
        formLabelAlign: {
          type: 2,
          money: '',
          isAdmin: false
        },
        dialogTableVisible: false,
        loading: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var paras = {
          id: this.$user.id()
        }
        var repone = await this.$api.httpGet('/Api/Account/DetailEdit', paras)
        if (repone.status !== 1) {
          this.$api.toastWarn(repone.messgae)
          return
        }
        this.viewModel = repone.result
      },
      saveTips () {
        var than = this
        if (this.formLabelAlign.money < 0) {
          return this.$notify({
            message: '充值金额不能为0，请输入充值金额',
            position: 'bottom-right'
          })
        }
        this.$confirm('确认充值' + this.formLabelAlign.money + '元?', '充值提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // than.loading = true
          than.save()
        }).catch(() => {
        })
      },
      async save () {
        var this_ = this
        this.formLabelAlign.userId = this.$user.loginUser().id
        var response = await this.$api.httpPost('Api/Account/Recharge', this.formLabelAlign)
        // this.loading = false
        if (response.status !== 1) {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'error'
          })
        } else if (response.result.payAmount === 0 && response.result.payId === 0) {
          this.$message({
            showClose: true,
            message: '恭喜您，开通成功',
            type: 'success'
          })
          setTimeout(function () {
            this_.$router.push('/user/index')
          }, 1500)
        } else {
          this_.dialogTableVisible = true
          this_.$nextTick(() => {
            this_.$refs.show_pay.$emit('payMethod', response.result.payId, response.result.payAmount, response.result.orderIds, '/user/index')
          })
        }
      }
    }
  }
 </script>

<style lang="scss" >
  @import "./var.scss";
</style>
