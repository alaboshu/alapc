<template>
  <div class="x-select-image">
    <div v-if="count > 1" class="x-select-image-all">
      <div v-for="(item,index) in count" :key="index" @click="selectImage(index)" class="x-select-image-list">
        <div v-if="viewModel&&viewModel[index]" class="x-select-image-choice">
          <img :src="$base.clientHost()+viewModel[index]" class="img" alt="">
          <div class="Mongolia" v-if="false">
            <i class="flaticon-search i-left"></i>
            <i class="el-icon-document i-right"></i>
          </div>
        </div>
        <div v-else class="select-upload">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
    <div v-else @click="selectImage()">
      <div v-if="viewModel" class="x-select-image-choice">
        <img :src="$base.clientHost()+viewModel" class="img" :alt="viewModel">
        <div class="Mongolia" v-if="false">
          <i class="flaticon-search i-left"></i>
          <i class="el-icon-document i-right"></i>
        </div>
      </div>
      <div v-else class="select-upload">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <el-dialog v-el-drag-dialog :visible="dialogVisible" top="8vh" :before-close="handleClose">
      <zk-file-manage @autoDialogClose="handleClose" @selectFileChildEvent="selectFileChildEvent"></zk-file-manage>
    </el-dialog>
  </div>
</template>


<script>
  import elDragDialog from '@/service/directives/el-dragDialog'
  export default {
    directives: { elDragDialog },
    model: {
      event: 'change',
      prop: 'dataModel'
    },
    data () {
      return {
        dialogVisible: false,
        selectIndex: 0, // 当前选择的图片索引
        viewModel: null // 监听视图 如果count=1上传一张图片，返回string.如果大于1，多张图片, 返回list
      }
    },
    props: {
      count: {
        default: 1 // 默认图片数量1。如果count=1上传一张图片，返回string.如果大于1，多张图片,返回list
      },
      type: {},
      dataModel: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.dataModel) {
          this.viewModel = this.dataModel
        } else {
          if (this.count > 1) {
            this.viewModel = []
          } else {
            this.viewModel = ''
          }
        }
      },
      handleClose () {
        this.dialogVisible = false
      },
      // 监听图片管理的选择事件
      selectFileChildEvent (image) {
        if (this.count > 1) {
          this.viewModel.splice(this.selectIndex, 1, image.path)
        } else {
          this.viewModel = image.path
        }
        this.handleClose()
      },
      selectImage (index) {
        this.selectIndex = index
        this.dialogVisible = true
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          this.$emit('change', this.viewModel)
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "./var.scss";
</style>


