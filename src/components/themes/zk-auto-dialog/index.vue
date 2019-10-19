<template>
  <div class="zk-auto-dialog">
    <el-dialog title="图片管理" :visible.sync="dialogVisible" :width="widget.width" :before-close="handleClose">
      <zk-file-manage @saveImage="saveImage" @fileManagerClose="handleClose" :isTenant="isTenant"></zk-file-manage>
    </el-dialog>
    <zk-progress ref="progressDialog"></zk-progress>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        widget: '',
        selectImageUrl: null, // 选择图片的地址
        dialogVisible: false,
        isTenant: null
      }
    },
    mounted () {
      this.$bus.$on('autoDialogEvent', this.autoDialog)
    },
    methods: {
      autoDialog (data) {
        // 消息跳转
        if (data.name === 'admin-message') {
          this.$router.push({ path: '/admin/message', query: { message: data.message, title: data.title, type: data.type } })
          return
        }
        // 进度条单独处理
        if (data.name === 'zk-progress') {
          this.$nextTick(() => {
            if (this.$refs.progressDialog !== undefined) {
              this.$refs.progressDialog.init(data.message, data.visible)
            }
          })
          return
        }
        if (data.name === 'zk-file-manage') {
          this.viewModel = data
          if (this.viewModel) {
            this.dialogVisible.fileManage = true
            if (data.para !== null && data.para.type !== null) {
              this.data.type = data.para.type
            }
          }
          if (data.width !== null) {
            this.data.width = data.width
          }
        }
      },
      handleClose () {
        this.dialogVisible = false
      },
      saveDialog (data) {
        this.dialogVisible = false
      },
      saveImage (imageUrl) {
        this.selectImageUrl = imageUrl
        this.$bus.$emit('imageUrl', imageUrl)
        this.dialogVisible = false
      }
    }
  }
</script>
