<template>
  <div class="zk-root-delete">
    <el-dialog :title="`删除${name}`" width="750px" :visible.sync="dialogFormVisible">
      <div class="delete-dialog">
        <el-alert title="删除模板提示" type="error" description="模板删除后，将彻底的删除所有的数据，并且不能恢复，请谨慎删除" :closable="false" show-icon>
        </el-alert>
        <el-form ref="form" style="margin-top:15px">
          <el-form-item :label="`确认${name}Id`" :required="true">
            <el-input v-model="paraForm.ConfirmId"></el-input>
            <div class="form-intro">请输入确认{{name}}Id,{{name}}ID <x-code>{{paraForm.themeId}}</x-code>
            </div>
          </el-form-item>
          <el-form-item label="登录手机号" :required="true">
            <el-input v-model="paraForm.mobile"></el-input>
            <div class="form-intro">您在阿拉博数平台预留的手机号码,请输入手机号码:{{$base.site().phone}}</div>
          </el-form-item>
          <el-form-item label="支付密码" :required="true">
            <el-input v-model="paraForm.payPassword" type="password"></el-input>
            <div class="form-intro">请输入您的支付密码</div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="danger" @click="deleteTheme">确定删除该{{name}}所有的数据，不可恢复!</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  export default {
    props: {
      name: {},
      rootType: {}
    },
    data () {
      return {
        dialogFormVisible: false,
        paraForm: {
          themeId: '',
          payPassword: '', // 手动输入
          mobile: '',
          confirmId: '' // 手动输入
        }
      }
    },
    methods: {
      async deleteTheme () {
        var par = {
          ...this.paraForm,
          id: this.paraForm.themeId
        }
        var reponese = await this.$api.httpPost('Api/Root/UserDelete', par)
        console.info('reponese', reponese)
        if (reponese.status === 1) {
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '模板已删除成功',
            type: 'success',
            position: 'bottom-right'
          })
          this.$emit('getInit')
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
      width: 120px;
    }
    .dialog-footer {
      padding: 0px !important;
    }
  }
</style>
