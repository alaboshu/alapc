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
  </div>
</template>


<script>
  export default {
    model: {
      event: 'imgUrl',
      prop: 'dataModel'
    },
    data () {
      return {
        imgUrl: '',
        list: []
      }
    },
    props: {
      // 默认图片数量1。如果count=1上传一张图片，返回string.如果大于1，多张图片,返回list
      count: {
        default: 1
      },
      // type=systemBackgoundManger 显示背景图片
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
      showImage (index) {
        var para = {
          type: this.type
        }
        this.$api.dialog('zk-file-image', para, '60%', '图片管理')
        this.$bus.$off('imageUrl').$on('imageUrl', (imageUrl) => {
          if (this.count > 1) {
            this.list.splice(index, 1, this.$base.clientHost() + imageUrl)
            this.$emit('imgUrl', this.list)
            return
          }
          this.imgUrl = this.$base.clientHost() + imageUrl
          this.$emit('imgUrl', this.imgUrl)
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "./var.scss";
</style>


