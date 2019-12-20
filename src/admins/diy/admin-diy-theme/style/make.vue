<template>
  <div class="zk-root-delete">
    <el-dialog :title="`复制${name}`" width="750px" :visible.sync="dialogFormVisible">
      <div class="delete-dialog">
        <el-alert title="复制模板" type="success" description="每个用户最多可复制20个模板，模板复制成功后，可在云端操作设计、设置、发布等" :closable="false" show-icon>
        </el-alert>
        <el-form ref="form" style="margin-top:15px">
          <el-form-item label="模板名称" :required="true">
            <el-input v-model="viewModel.name"></el-input>
            <div class="form-intro">输入模板名称，长度不能超过60个字符
            </div>
          </el-form-item>
          <el-form-item label="模板简介" :required="true">
            <el-input type="textarea" :rows="3" v-model="viewModel.intro"></el-input>
            <div class="form-intro">输入模板的简介,长度不能超过500个字符 </div>
          </el-form-item>
          <el-form-item label="云平台支付密码" :required="true">
            <el-input v-model="viewModel.payPassword" type="password"></el-input>
            <div class="form-intro">您在阿拉博数平台(www.5ug.com)的支付密码，非当前管理员密码，非平台的登录密码</div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" type="default">取 消</el-button>
        <el-button type="danger" @click="makeTheme" :loading="loading">开始复制模板</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  import diyHttp from '@/service/core/diy.http'
  export default {
    props: {
      name: {}
    },
    data () {
      return {
        dialogFormVisible: false,
        loading: false,
        viewModel: {}
      }
    },
    methods: {
      init (theme) {
        this.viewModel = theme
        this.dialogFormVisible = true
      },
      async makeTheme () {
        this.loading = true
        var site = await this.$base.siteAsync()
        var makeInput = {
          SiteId: site.id,
          themeId: this.viewModel.id,
          userId: site.userId,
          payPassword: this.viewModel.payPassword,
          name: this.viewModel.name,
          intro: this.viewModel.intro
        }
        var response = await diyHttp.post('/Api/DiyClient/Make', makeInput)
        this.loading = false
        if (response.status === 1) {
          this.dialogFormVisible = false
          this.$alert('恭喜,模板复制成功,点击确定开始复制模板', '复制成功', {
            confirmButtonText: '确定',
            callback: async action => {
              await this.$emit('afterMake', response.result)
            }
          })
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
