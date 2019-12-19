<template>
  <div class="zk-root-delete">
    <el-dialog :title="`制作${name}`" width="750px" :visible.sync="dialogFormVisible">
      <div class="delete-dialog">
        <el-alert title="制作模板" type="success" description="每个用户最多可制作20个模板，模板制作成功后，可在云端操作设计、设置、发布等" :closable="false" show-icon>
        </el-alert>
        <el-form ref="form" style="margin-top:15px">
          <el-form-item label="模板名称" :required="true">
            <el-input v-model="paraForm.name"></el-input>
            <div class="form-intro">输入模板名称，长度不能超过60个字符
            </div>
          </el-form-item>
          <el-form-item label="模板简介" :required="true">
            <el-input type="textarea" :rows="3" v-model="paraForm.intro"></el-input>
            <div class="form-intro">输入模板的简介,长度不能超过500个字符 </div>
          </el-form-item>
          <el-form-item label="云平台支付密码" :required="true">
            <el-input v-model="paraForm.payPassword" type="password"></el-input>
            <div class="form-intro">您在阿拉博数平台(www.5ug.com)的支付密码，非当前管理员密码，非平台的登录密码</div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" type="default">取 消</el-button>
        <el-button type="danger" @click="primary">开始制作模板</el-button>
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
          name: '',
          intro: ''
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
      width: 130px;
    }
    .dialog-footer {
      padding: 0px !important;
    }
  }
</style>
