<template>
  <div class="goods-img fl">
    <div class="bigImg">
      <!-- <p class="big_img_title"><span> 女士精品 ：</span> &nbsp;&nbsp; 2018WQL秋季新款格纹雪纺连衣裙 QL2F0790-18039</p> -->
      <div v-for="(item,index) in bigImgList" :key="index" v-show=" index == num" class="bigItem">
        <my-magnify :previewImg="getImage(item)" :zoomImg="getImage(item)" class="big_img_item"></my-magnify>
      </div>
    </div>
    <ul class="goods-img_smallImg">
      <li v-for="(item,index) in smallImg" :key="index" :class="{'actives':index == num}" @click="getIndex(index)" class="imgItem"><img :src="getImage(item)"></li>
    </ul>
  </div>
</template>
<script>
  import MyMagnify from './show_property'
  export default {
    components: {
      MyMagnify
    },
    props: {
      productShow: {}
    },
    data () {
      return {
        lunboIndex: 0,
        carouselBool: true,
        current: 0,
        bigImgList: [

        ],
        smallImg: [

        ],
        num: 0
      }
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.productShow.detail.imageJson = JSON.parse(this.productShow.detail.imageJson)
        for (var i = 0; i < this.productShow.detail.imageJson.length; i++) {
          this.bigImgList.push(this.productShow.detail.imageJson[i].OriginalUrl)
          this.smallImg.push(this.productShow.detail.imageJson[i].ShowCaseUrl)
        }
      },
      oncilcks (index) {
        this.lunboIndex = index
      },
      shulveClick (imgesIndex) {
        this.$refs.carousel.setActiveItem(imgesIndex)
        this.carouselBool = false
      },
      removedFrom () {
        this.carouselBool = true
      },
      getIndex (index) {
        this.num = index
      },
      getImage (image) {
        if (image.indexOf('https://') > -1 || image.indexOf('http://') > -1) {
          return image
        } else {
          return this.$api.baseUrl() + image
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .fl {
    .goods-img_smallImg {
      height: 80px;
      background: #eee;
      display: flex;
      align-items: center;
      padding: 0px 20px;
      .imgItem {
        width: 60px;
        height: 60px;
        margin: 0px 5px;
        border: 1px solid transparent;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .actives {
        border: 1px solid red;
      }
    }
  }
  .bigImg {
    margin-top: 20px;
    .big_img_title {
      margin-bottom: 20px;
      float: left;
      font-size: 12px;
      color: #666;
      display: inline-block;
      width: auto;
      max-width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span {
        font-size: 18px;
        font-weight: 700;
        color: #666;
        float: left;
        font-family: "microsoft yahei";
      }
    }
  }
  .bigItem .big_img_item {
    width: 405px !important;
    height: 405px !important;
  }
</style>


