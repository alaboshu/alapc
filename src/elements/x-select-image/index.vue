<template>
  <div class="x-select-image">
    <div v-if="count > 1" class="x-select-image-all">
      <div v-for="(item,index) in count" :key="index" @click="showImage(index)" class="x-select-image-list">
        <div v-if="list[index]" class="x-select-image-choice">
          <img :src="list[index]" class="img" alt="">
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
    <div v-else @click="showImage()">
      <div v-if="imgUrl" class="x-select-image-choice">
        <img :src="imgUrl" class="img" alt="">
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
      event: 'imgUrl',
      prop: 'dataModel'
    },
    data () {
      return {
        dialogVisible: false,
        imgUrl: '',
        list: []
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
        if (this.dataModel !== undefined && this.dataModel !== null && this.dataModel !== '') {
          if (this.count > 1) {
            this.list = this.dataModel
            return
          }
          this.imageUrl = this.dataModel
        }
      },
      handleClose () {
        this.dialogVisible = false
      },
      selectFileChildEvent (data) {
        this.currentIcon.name = data
        this.changeIconEvent()
      },
      showImage (index) {
        this.dialogVisible = true
        //   this.$api.dialog('zk-file-manage', para, '60%', '图片管理')
        //   this.$bus.$off('imageUrl').$on('imageUrl', (imageUrl) => {
        //     if (this.count > 1) {
        //       this.list.splice(index, 1, this.$base.clientHost() + imageUrl)
        //       this.$emit('imgUrl', this.list)
        //       return
        //     }
        //     this.imgUrl = this.$base.clientHost() + imageUrl
        //     this.$emit('imgUrl', this.imgUrl)
        //   })
      }
    },
    watch: {
      currentIcon: {
        deep: true,
        handler (val) {
          this.$emit('change', this.currentIcon)
          this.$emit('selectIconChild', this.currentIcon)
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "./var.scss";
</style>


