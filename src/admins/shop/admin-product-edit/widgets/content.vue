<template>
  <div class="basics">
    <h1 class="basics_title">详情</h1>
    <div class="title_row basics_row">
      <div class="basics-title_row">
        <div class="title_left">商品副标题:</div>
        <div class="title_right">
          <el-input maxlength="30" v-model="productView.productDetail.productDetailExtension.productSubTitle" size="large" placeholder="商品副标题"></el-input>
          <div class="text-inrto">展示在商品详情页中</div>
        </div>
      </div>
      <div class="basics-title_row">
        <div class="title_left">商品详情:</div>
        <div class="title_right">
          <vue-ueditor-wrap v-model="productView.productDetail.intro"></vue-ueditor-wrap>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VueUeditorWrap from 'vue-ueditor-wrap'
  export default {
    props: {
      productView: {}
    },
    components: {
      VueUeditorWrap
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.productView.productDetail.intro === null) {
          this.productView.productDetail.intro = ''
        }
      }
    }
  }
</script>

<style>
  .edui-default .edui-editor {
    width: 1024px !important;
  }
  .edui-editor-iframeholder{
    width: 1024px !important;
  }
</style>

