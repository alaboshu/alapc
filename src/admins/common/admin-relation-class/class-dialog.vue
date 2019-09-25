<template>
  <el-dialog :visible.sync="dialogFormVisible">
    <div class="class-dialog">
      <el-form label-width="150px">
        <el-form-item label="名称" :required="true">
          <el-input v-model="column.name"></el-input>
          <div class="class-intro">输入名字长度在40个字符以内</div>
        </el-form-item>
        <el-form-item label="图片/图标">
          <div class="formData-img">
            <div style="position: relative;">
              <el-upload :action="baseUrl+'/api/common/upload'" list-type="picture-card" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="column.icon" class="upload_img" :src="baseUrl+column.icon" alt="">
                <i v-else class="el-icon-plus"></i>
              </el-upload>
              <div class="img_buttom-text"></div>
            </div>
          </div>
          <div class="class-intro">上传图片</div>
        </el-form-item>
        <el-form-item label="排序" :required="true">
          <el-input class="strot-input" v-model="column.sortOrder"></el-input>
          <div class="class-intro">排序越小越输入在前面</div>
        </el-form-item>
        <el-form-item label="状态">
          <div class="formData-radio">
            <el-radio-group v-model="viewModel.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">冻结</el-radio>
              <el-radio :label="3">删除</el-radio>
            </el-radio-group>
          </div>
          <div class="class-intro">状态为正常时才显示</div>
        </el-form-item>
      </el-form>
      <div class="class-dialog_footer">
        <el-button type="primary" class="tab-button" @click.native="save">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      save: {},
      viewModel: {},
      singleData: {}
    },
    data () {
      return {
        baseUrl: this.$api.baseUrl(),
        dialogFormVisible: false,
        column: '',
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.column = this.viewModel
      },
      handleAvatarSuccess (res, file, filelist) {
        this.column.icon = res.result.path
      },
      beforeAvatarUpload (file) {

      }
    },
    watch: {
      dialogFormVisible (val) {
        if (val === true) {
          this.column = this.viewModel
        } else {
          this.column = ''
        }
      },
      singleData (val) {
        if (val.result) {
          this.column = val.result
        }
        // this.column = this.singleData
      }
    }
  }
</script>




<style lang="scss" scoped>
  @import "~./var.scss";
</style>




<style rel="stylesheet/scss" lang="scss">
  .class-dialog {
    .el-form {
      padding: 20px;
    }
    .el-form-item__label {
      padding-right: 20px;
      color: #3f4047;
      font-size: 13px;
      font-weight: 400;
    }
    .class-intro {
      font-size: 11px;
      color: #7b7e8a;
      line-height: 14px;
      margin-bottom: 5px;
    }
    .strot-input {
      width: 80px;
    }
    .class-dialog_footer {
      border-top: 1px solid #f0f0f0;
      padding: 10px 170px;
    }
  }
</style>
