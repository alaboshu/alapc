<template>
  <div class="images_text">
    <h1 class="images_title">图文信息</h1>
    <div class="images_show">
      <div class="show-title">电脑端宝贝图片:</div>
      <div>
        <div class="upload_img" v-if="uploadImage">
          <div v-for="(item, index) in uploadImage" @click="imgIndex = index" :key="index">
            <el-upload class="avatar-uploader" ref="index" :action="$api.baseUrl()+'/api/common/upload'" :before-upload="beforeAvatarUpload" :show-file-list="false" :on-success="handleAvatarSuccess">
              <div v-if="item" class="uplaader-box">
                <img :src="$api.baseUrl()+item" class="avatar">
                <div class="up-remove" @click.stop="handleRemove(index)">删除</div>
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <p class="img_news_a">请您严格按照最佳比例 宽：高=1.0 上传主图,同时尽量保证主图宽度大于600px;</p>
        <p class="img_news_a">上传图片的最佳尺寸为：宽=800px 高=800.0px</p>
        <p class="img_news_a">第一张图片为商品主图，图片上传可以在控制面板中设设置</p>
        <p class="img_news_a">支持:jpg、jpeg、png、gif图片格式</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      productView: {}
    },
    data () {
      return {
        imgIndex: '',
        uploadImage: [] // 已上传图片
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        for (let i = 0; i < 5; i++) {
          this.uploadImage.push('')
        }
        if (this.productView.images !== null) {
          for (let item in this.productView.images) {
            this.uploadImage[item] = this.productView.images[item]
          }
        }
      },
      change () {
        this.$emit('changeImage', this.uploadImage)
      },
      handleRemove (index) {
        this.uploadImage.splice(index, 1, '')
        this.change()
      },
      handleAvatarSuccess (res, file, filelist) {
        this.uploadImage.splice(this.imgIndex, 1, res.result.path)
        this.change()
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$notify.error({
            title: '错误',
            message: '只能上传JPG格式的照片',
            position: 'bottom-right'
          })
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>
