<template>
  <el-upload class="upload-demo" :action="$api.baseUrl()+'/api/common/upload'" :multiple="widget.options.multiple" :disabled="widget.options.disabled" :on-success="handleAvatarSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="widget.options.limit" :on-exceed="handleExceed" :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>
<script>
  export default {
    data () {
      return {
        fileList: []
      }
    },
    props: {
      value: Array,
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.fileList = this.value
      },
      handleAvatarSuccess (res, file) {
        if (res.status === 1) {
          // this.dataModel = res.result.path
          this.$message.success('上传成功')
        } else {
          this.$message.success('上传失败')
        }
      },
      handlePreview (file) {
      },
      handleRemove (file, fileList) {
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      }
    },
    watch: {
      fileList (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
