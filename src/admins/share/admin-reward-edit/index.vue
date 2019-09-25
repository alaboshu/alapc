<template>
  <div class="admin-reward">
    <x-border title="分润编辑" color="accent">
      <el-form label-position="right" label-width="160px">
        <el-tabs class="admin-reward_tabs">
          <el-tab-pane>
            <span slot="label" class="tab-pane-span"><i class="el-icon-chat-line-round"></i>基本信息</span>
            <div class="tab-pane-boxs">
              <edit-base :viewModel="viewModel" v-if="viewModel"> </edit-base>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="tab-pane-span"><i class="el-icon-set-up"></i>分润规则</span>
            <div class="tab-pane-boxs">
              <edit-module :viewModel="viewModel" v-if="viewModel"> </edit-module>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="tab-pane-span"><i class="flaticon-user"></i>用户与等级</span>
            <div class="tab-pane-boxs">
              <edit-range-user :viewModel="viewModel" v-if="viewModel"></edit-range-user>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="tab-pane-span"><i class="flaticon-analytics"></i>分润范围</span>
            <div class="tab-pane-boxs">
              <edit-range :viewModel="viewModel" v-if="viewModel"></edit-range>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="tab-pane-span"><i class="flaticon-coins"></i>资产分配</span>
            <div class="tab-pane-boxs">
              <assets-rule :viewModel="viewModel" v-if="viewModel"></assets-rule>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-form-item class="form-buttom">
          <el-button type="primary" @click="dialogVisible = true">保存</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="保存分润规则" :visible.sync="dialogVisible">
        <div class="admin-reward_dialog">
          <div class="modal-body">修改分润规则可能会对市场造成一定的影响，同时可能导致数据出现不可修复的错误。请慎重！保存之前请确保您已详细阅读《服务条款&免责声明》</div>
          <el-form label-width="150px" class="reward_dialog-form">
            <el-form-item label="支付密码" :required="true">
              <el-input type="password" v-model="viewModel.payPassword"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" class="footer_cancel">取 消</el-button>
          <el-button type="primary" @click="onSubmit" :loading="loading">同意《免责申明》并保存</el-button>
        </span>
      </el-dialog>
    </x-border>
  </div>
</template>
<script>
  import editBase from './widget/edit-base.vue'
  import editModule from './widget/edit-module.vue'
  import editRange from './widget/edit-range.vue'
  import editRangeUser from './widget/edit-range-user.vue'
  import assetsRule from './widget/assets-rule.vue'
  export default {
    components: {
      editBase,
      editModule,
      editRange,
      editRangeUser,
      assetsRule
    },
    data () {
      return {
        viewModel: null,
        dialogVisible: false,
        password: '',
        loading: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var para = {
          moduleId: this.$route.query.moduleId,
          id: this.$route.query.id
        }
        var response = await this.$api.httpGet('/Api/RewardRule/GetEditView', para)
        if (response.status === 1) {
          this.viewModel = response.result
        }
      },
      // 保存
      async onSubmit () {
        this.loading = true
        var response = await this.$api.httpPost('/Api/RewardRule/GetEditView', this.viewModel)
        if (response.status === 1) {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success'
          })
          this.dialogVisible = false
        } else {
          this.$notify.error({
            title: '错误',
            position: 'bottom-right',
            message: response.message
          })
        }
        this.loading = false
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
