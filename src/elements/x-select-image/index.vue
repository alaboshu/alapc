<template>
  <div class="x-select-image" :style="'width:'+width+'px;height:'+height+'px'">
    <div v-if="count > 1" class="x-select-image-all">
      <div v-for="(item,index) in count" :key="index" @click="showImage(index)" class="x-select-image-list">
        <div v-if="list[index]" class="x-select-image-choice">
          <div class="img_div">
            <img :src="list[index]" class="image" :style="'width:'+width+'px;height:'+height+'px'" alt="">
          </div>
          <div class="Mongolia" v-if="false">
            <i class="flaticon-search i-left"></i>
            <i class="el-icon-document i-right"></i>
          </div>
          <div class="x-select-image-meng" v-if="isBoost">
            <i class="el-icon-zoom-in icon" @click.stop="valImage(list[index])"></i>
          </div>
        </div>
        <div v-else class="select-upload" :style="'width:'+width+'px;height:'+height+'px'">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
    <div v-else @click="showImage()">
      <div v-if="imgUrl" class="x-select-image-choice">
        <div class="img_div">
          <img :src="imgUrl" class="image" :style="'width:'+width+'px;height:'+height+'px'" alt="">
        </div>
        <div class="x-select-image-meng" v-if="isBoost">
          <i class="el-icon-zoom-in icon" @click.stop="valImage(imgUrl)"></i>
        </div>
      </div>
      <div v-else class="select-upload" :style="'width:'+width+'px;height:'+height+'px'">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <div v-if="isBoost">
      <el-dialog title="图片放大" :visible.sync="dialogTableVisible">
        <img :src="enlargeImage" class="x-select-image-show" alt="">
      </el-dialog>
    </div>
    <zk-auto-dialog ref="zkAutoDialog"></zk-auto-dialog>
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
        list: [],
        enlargeImage: '',
        dialogTableVisible: false
      }
    },
    props: {
      // 默认图片数量1。如果count=1上传一张图片，返回string.如果大于1，多张图片,返回list
      count: {
        default: 1
      },
      dataModel: {},
      width: {
        default: 100
      },
      height: {
        default: 100
      },
      widget: {},
      isUpload: {
        default: true
      },
      isBoost: {
        default: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.dataModel !== undefined && this.dataModel !== null && this.dataModel !== '') {
          if (this.count > 1) {
            if (this.dataModel instanceof Array) {
              this.list = this.dataModel
              return
            }
            this.list.push(this.dataModel)
            return
          }
          this.imgUrl = this.dataModel
        }
      },
      showImage (index) {
        if (this.isUpload) {
          var data = ''
          if (this.widget) {
            data = this.widget.tenant
          }
          this.$refs.zkAutoDialog.$emit('autoDialogEvent', data)
          this.$bus.$off('imageUrl').$on('imageUrl', (imageUrl) => {
            if (this.count > 1) {
              this.list.splice(index, 1, this.$api.baseUrl() + imageUrl)
              this.$emit('imgUrl', this.list)
              return
            }
            this.imgUrl = this.$api.baseUrl() + imageUrl
            this.$emit('imgUrl', this.imgUrl)
          })
        }
      },
      valImage (image) {
        if (this.isBoost) {
          this.enlargeImage = image
          this.dialogTableVisible = true
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "./var.scss";
</style>


