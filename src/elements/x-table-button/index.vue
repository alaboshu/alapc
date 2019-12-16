<template>
  <div class="x-table-button">
    <el-button class="x-table-button-button" type="primary" v-if="dataModel.type" @click="showForm">{{dataModel.name}}</el-button>
    <div v-else>{{dataModel.name}}</div>
    <el-dialog :title="dataModel.name" :visible.sync="dialogVisible" width="55%" v-loading="loading">
      <zk-auto-form :serviceConfig="viewModel" v-if="viewModel" ref="zkAutoForm" :showBotton="false" @saveForm="saveForm"></zk-auto-form>
      <div class="x-table-button-foot">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      dataModel: {},
      scope: {}
    },
    data () {
      return {
        dialogVisible: false,
        viewModel: null,
        loading: true
      }
    },
    methods: {
      async showForm () {
        this.dialogVisible = true
        var para = {
          type: this.dataModel.type,
          userId: this.$user.id(),
          id: this.scope.id
        }

        var response = await this.$api.httpGet('/Api/Auto/Form', para)
        if (response.status === 1) {
          this.viewModel = response.result
        } else {
          this.$notify({
            title: '操作失败',
            type: 'error',
            message: response.message,
            position: 'bottom-right'
          })
        }
      },
      submit () {
        this.$refs.zkAutoForm.saveForm()
      },
      async saveForm (models) {
        if (this.$route.query.id) {
          models.id = this.$crud.getId()
        }
        let parameter = {
          type: this.dataModel.type,
          model: JSON.stringify(models)
        }
        var response = await this.$api.httpPost('/api/auto/save', parameter)
        if (response.status === 1) {
          this.$message.success('恭喜你操作成功')
          this.dialogVisible = false
          this.$emit('change')
        } else {
          this.$message.error(response.message)
        }
      }
    }
  }
</script>
<style  lang="scss" scoped>
  .x-table-button {
    .el-button {
      padding: 5px 10px;
    }
    .x-table-button-foot {
      border-top: 1px solid #e5e5e5;
      padding: 20px;
      display: flex;
      justify-content: flex-end;
      .el-button {
        padding: 10px 12px;
      }
    }
  }
</style>
