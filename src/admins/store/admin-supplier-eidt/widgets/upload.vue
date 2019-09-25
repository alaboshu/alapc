<template>
  <div class="upload">
    <div style="position: relative;" v-for="(item, index) in config.images" :key="index" @click="imgIndex = index">
      <el-upload :action="baseUrl+'/api/common/upload'" list-type="picture-card" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="item !== ' '" class="upload_img" :src="baseUrl+item" alt="">
        <i v-else class="el-icon-plus"></i>
      </el-upload>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['config'],
    data () {
      return {
        baseUrl: this.$api.baseUrl(),
        image: [],
        imgIndex: 0
      }
    },
    mounted () {
      if (this.config.images.length < 1) {
        for (let i = 0; i < 3; i++) {
          this.config.images.push(' ')
        }
      }
    },
    methods: {
      handleAvatarSuccess (res, file, filelist) {
        this.config.thumbnailUrl = res.result.path
        this.config.images.splice(this.imgIndex, 1, res.result.path)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>


<style lang="scss">
  .upload {
    display: flex;
    .el-upload--picture-card i {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -14px;
      margin-top: -23px;
    }
    .el-upload--picture-card {
      width: 110px;
      height: 110px;
    }
    div {
      margin-right: 10px;
      width: 110px;
      .img_buttom-text {
        height: 20px;
        line-height: 20px;
        text-align: center;
        margin: 0;
      }
    }
    .upload_img {
      position: absolute;
      top: 0;
      left: 0;
      width: 110px;
      height: 110px;
      border-radius: 2px;
    }
  }
</style>

