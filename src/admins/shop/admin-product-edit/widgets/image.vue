<template>
  <div class="images_text">
    <h1 class="images_title">图文信息</h1>
    <div class="images_show">
      <div class="show-title">电脑端宝贝图片:</div>
      <div>
        <div class="upload_img" v-if="uploadImage">
          <x-select-image v-model="productView.images" :count="6"></x-select-image>
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
      }
    }
  }
</script>
