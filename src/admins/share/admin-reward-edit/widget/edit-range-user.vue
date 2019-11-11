<template>
  <div class="user-level">
    <div class="alert-success">
      <div class="alert-success_box">
        <p>根据阿拉博数多年的分润经验以及大量的客户见证，建议整个系统的分润体系设置多个用户类型，每个用户类型设置3个左右的等级，这样更容易让企业的商业模式闭环。</p>
        <p>限制的为触发用户类型</p>
      </div>
    </div>
    <x-line :border="true" title="收益用户,获利会员设置" type="metal" icon="flaticon-users" style="padding:0px 15px;"></x-line>
    <el-form-item label="是否限制获利会员类型">
      <el-switch v-model="viewModel.userRang.orderUser.isLimitOrderUserType" @change="headleSwitch(viewModel.userRang.orderUser.isLimitOrderUserType, 'orderUser')"></el-switch>
      <div class="demo_intro">开启获利会员限制后，只对特定的用户类型有效</div>
    </el-form-item>
    <edit-range-user-form v-show="viewModel.userRang.orderUser.isLimitOrderUserType" type="orderUser" :viewModel="viewModel.userRang.orderUser"></edit-range-user-form>

    <x-line :border="true" title="订单用户,触发会员设置" type="metal" icon="null" style="padding:0px 15px;"></x-line>
    <el-form-item label="是否限制触发会员类型">
      <el-switch v-model="viewModel.userRang.shareUser.isLimitShareUserType" @change="headleSwitch(viewModel.userRang.shareUser.isLimitShareUserType, 'shareUser')"></el-switch>
      <div class="demo_intro">开启触发会员限制后，只对特定的用户类型有效</div>
    </el-form-item>
    <edit-range-user-form v-show="viewModel.userRang.shareUser.isLimitShareUserType" type="ShareUserGrade" :viewModel="viewModel.userRang.shareUser"></edit-range-user-form>
  </div>
</template>
<script>
  import editRangeUserForm from './edit-range-user-form'
  export default {
    props: {
      viewModel: {}
    },
    components: {
      editRangeUserForm
    },
    data () {
      return {
        widgetModel: {}
      }
    },
    mounted () {
      console.info('就是你了', this.viewModel)
      this.init()
    },
    methods: {
      init () {
        if (this.viewModel) {
          // this.
        }
      },
      headleSwitch (val, type) {
        var data = this.viewModel.userConfig
        if (val === false) {
          if (type === 'orderUser') {
            data.orderUser.orderUserGradeId = ''
            data.orderUser.orderUserTypeId = ''
          } else if (type === 'shareUser') {
            data.shareUser.shareUserGradeId = ''
            data.shareUser.shareUserTypeId = ''
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .user-level {
    .alert-success {
      padding: 15px;
      .alert-success_box {
        border-radius: 4px;
        background-color: #45ccb1;
        padding: 15px 25px 10px 25px;
        p {
          color: #ffffff;
          font-size: 13px;
          margin-bottom: 5px;
          font-weight: 300;
        }
      }
    }
  }
</style>
