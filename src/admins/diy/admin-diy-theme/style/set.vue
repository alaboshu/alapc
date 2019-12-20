<template>
  <div class="zk-root-delete">
    <el-dialog title="设置默认模板" width="750px" :visible.sync="dialogFormVisible">
      <div class="delete-dialog">
        <el-alert title="设置默认模板" type="error" description="修改默认模板时，其他用户浏览体验可能会受到影响，请谨慎选择。 模板未发布时，请先发布后再设置默认模板" :closable="false" show-icon>
        </el-alert>
        <el-form ref="form" style="margin-top:15px">
          <el-form-item label="当前默认模板" class="defaultTheme" v-if="defaultTheme">{{defaultTheme.name}}
            <div class="form-intro">默认模板ID：{{defaultTheme.id}} </div>
          </el-form-item>
          <el-form-item label="新默认模板" class="defaultTheme" v-if="viewModel">{{viewModel.name}}
            <div class="form-intro">新默认模板ID：{{viewModel.id}} </div>
          </el-form-item>
          <el-form-item label="发布状态" class="themeStatus" v-if="find.async">{{find.text}}
            <div class="form-intro" v-if="!find.status">操作流程:点击发布模板按钮，在diy云平台中点击右上角发布按钮 </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" type="default">取 消</el-button>
        <el-button type="danger" @click="diyTheme" v-if="!find.status" :loading="loading">发布模板</el-button>
        <el-button type="danger" @click="setDefault" v-else :loading="loading">设置默认模板</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import service from './service'
  import theme from '@/service/core/theme'
  export default {
    data () {
      return {
        dialogFormVisible: false,
        defaultTheme: null,
        loading: false,
        find: {
          status: false,
          async: false,
          text: '模板未发布,请先发布再设置默认模板'
        },
        viewModel: null
      }
    },
    methods: {
      async init (theme, defaultTheme) {
        this.loading = false
        this.dialogFormVisible = true
        this.defaultTheme = defaultTheme
        var para = {
          id: theme.id
        }
        var response = await this.$api.httpGet('/api/theme/querysingle', para)
        if (response.status === 1 && response.result && response.result.id) {
          this.find.status = true
          this.find.text = '模板已发布'
        } else {
          this.find.status = false
          this.find.text = '模板未发布,请先发布再设置默认模板'
        }
        this.find.async = true
        this.viewModel = theme
      },
      async diyTheme () {
        this.dialogFormVisible = false
        await service.diy(this, this.viewModel)
      },
      async setDefault () {
        this.loading = true
        var para = {
          id: this.viewModel.id
        }
        var response = await this.$api.httpGet('/Api/theme/SetDefaultTheme', para)
        if (response.status === 1) {
          this.$notify({
            title: '成功',
            message: '默认模板已设置成功',
            type: 'success',
            position: 'bottom-right'
          })
          this.loading = false
          this.dialogFormVisible = false
          await this.deleteAdminCache()
          this.$emit('afterSetDefault')
        } else {
          this.$api.alert(response.message)
        }
      },
      // 清空管理后台模板
      async  deleteAdminCache () {
        // 后台管员后，清空模板
        if (this.defaultTheme.type === 3 && this.defaultTheme.clientType === 1) {
          this.$api.localRemove('allPageInfo_admin__PcWeb')
          this.$api.vuexRemove('allPageInfo_admin__PcWeb')
          this.$api.localRemove('adminRoleOutput')
          this.$api.vuexRemove('adminRoleOutput')
          await theme.getAllPageList('admin')
          await this.$bus.$emit('global_loading_theme')
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .zk-root-delete {
    .defaultTheme {
      color: #ad5beb;
      font-weight: 600;
    }
    .themeStatus {
      color: #5867dd;
    }
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
