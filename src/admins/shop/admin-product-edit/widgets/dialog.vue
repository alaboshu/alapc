<template>
  <div class="dialog">
    <el-dialog title="审核" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div class="dialog-cont">
        <el-form :model="form" label-width="100px">
          <el-form-item>
            <el-radio-group v-model="form.state">
              <el-radio :label="2">通过审核</el-radio>
              <el-radio :label="3">拒绝审核</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="拒绝原因" v-if="form.state === 3">
            <el-input v-model="form.auditMessage" type="textarea" placeholder="请输入拒绝原因"></el-input>
            <div class="tips">请输入拒绝原因</div>
          </el-form-item>
          <el-form-item label="通过审核" v-if="form.state === 2">
            <div>审核通过商品将直接上架</div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        radio: 2,
        form: {
          id: this.viewModel.product.id,
          state: 2,
          auditMessage: '',
          storeClass: this.viewModel.productDetail.productDetailExtension.storeClass,
          tags: this.viewModel.productDetail.productDetailExtension.tags
        }
      }
    },
    props: {
      viewModel: {},
      init: {}
    },
    methods: {
      handleClose () {
        this.dialogVisible = false
      },
      async save () {
        var response = await this.$api.httpPost('Api/Product/AuditProduct', this.form)
        if (response.status === 1) {
          this.dialogVisible = false
          this.init()
        }
      }
    }
  }
</script>


<style lang="scss">
  @import "./style/dialog.scss";
</style>
