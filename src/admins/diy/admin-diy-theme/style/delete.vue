<template>
  <div class="zk-root-delete">
    <el-dialog :title="`删除 ${name} 模板`" width="750px" :visible.sync="dialogFormVisible">
      <div class="delete-dialog">
        <el-alert :title="`删除${name}提示`" type="error" description="模板删除后，将彻底的删除所有的数据，并且不能恢复，请谨慎删除，默认模板不能删除" :closable="false" show-icon>
        </el-alert>
        <el-form ref="form" style="margin-top:15px">
          <el-form-item :label="`确认模板Id`" :required="true">
            <el-input v-model="viewModel.confirmId"></el-input>
            <div class="form-intro">请输入确认{{name}}Id,{{name}}ID <x-code>{{viewModel.themeId}}</x-code>
            </div>
          </el-form-item>
          <el-form-item label="云平台手机号" :required="true">
            <el-input v-model="viewModel.mobile"></el-input>
            <div class="form-intro">您在阿拉博数平台预留的手机号码,请输入手机号码:<x-code>{{$base.site().phone}}</x-code>
            </div>
          </el-form-item>
          <el-form-item label="云平台支付密码" :required="true">
            <el-input v-model="viewModel.payPassword" type="password"></el-input>
            <div class="form-intro">您在阿拉博数平台(www.5ug.com)的支付密码，非当前管理员密码，非平台的登录密码</div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" type="default">取 消</el-button>
        <el-button type="danger" :loading="loading" @click="deleteTheme">确定删除该{{name}}所有的数据，不可恢复!</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  import diyHttp from '@/service/core/diy.http'
  export default {
    data () {
      return {
        dialogFormVisible: false,
        loading: false,
        name: '',
        viewModel: {}
      }
    },
    methods: {
      init (theme) {
        this.viewModel.themeId = theme.id
        this.dialogFormVisible = true
        this.viewModel.mobile = this.$base.site().phone
        this.name = theme.name
      },
      async deleteTheme () {
        this.viewModel.userId = this.$base.site().userId
        this.viewModel.rootType = 5
        this.loading = true
        var par = {
          ...this.viewModel,
          id: this.viewModel.themeId
        }
        // 删除云端模板
        var response = await diyHttp.post('/Api/DiyClient/UserDelete', par)
        this.loading = false
        if (response.status === 1) {
          // 删除本地模板
          response = await this.$api.httpDelete('Api/Theme/Delete', par)
          this.viewModel = {}
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '模板已删除成功',
            type: 'success',
            position: 'bottom-right'
          })
          this.$emit('afterDelete')
        } else {
          this.$api.alert(response.message)
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .zk-root-delete {
    .delete-dialog {
      padding: 20px;
      border-bottom: 1px solid #f0f0f0;
      .el-form-item__label {
        font-size: 13px;
        font-weight: 400;
      }
      .form-intro {
        font-size: 12px;
        color: #999999;
        height: 16px;
        line-height: 16px;
      }
    }
    .el-form-item .el-form-item__label {
      width: 130px;
    }
    .dialog-footer {
      padding: 0px !important;
    }
  }
</style>
