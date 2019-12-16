<template>
  <div class="zk-news-product">
    <div class="pc-p-news-product">
      <div class="news-product">
        <h3 class="product-title">精彩新闻</h3>
        <ul class="product-list">
          <li class="li-children" v-for="(item,index) in viewModel.apiDataList" :key="index" @click="getOnlist(item.id)">
            <div class="product-li">
              <div class="product-box">
                <img :src="item.image" class="product-img">
              </div>
              <router-link to="" class="product-text">{{item.title}}</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  
  import { ARTICLE_TOPLINELIST_GET } from '@/service/core/apiUrl'
  export default {
    
    data () {
      return {
        widgetModel: '',
        viewModel: ''
      }
    },
    props: {
      widget: {}
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        var response = await this.$api.httpGet(ARTICLE_TOPLINELIST_GET)
        this.viewModel = response.result
      },
      getOnlist (id) {
        this.$router.push('/articles/topline/index?id=' + id)
        this.$emit('getProduct')
      }
    }
  }
</script>


<style scoped lang="scss">
  @import "~_style/theme.scss";
  .zk-news-product {
    width: 100%;
    border-top: 2px solid $gl-brand;
    background-color: #f8f8f8;

    .pc-p-news-product {
      font-size: $gl-size-base;
    }
    .product-list {
      padding: 0px 10px;
    }
    .product-title {
      font-size: 18px;
      color: #222;
      padding-top: 15px;
      padding-left: 20px;
      padding-bottom: 12px;
    }
    .product-img {
      width: 100%;
      height: 84px;
      transition: 1s all;
    }
    .product-box {
      width: 100%;
      height: 84px;
      overflow: hidden;
    }
    .product-box:hover .product-img {
      transform: scale(1.1);
    }
    .li-children {
      width: 134px;
      display: inline-block;
      vertical-align: text-top;
      margin-bottom: 10px;
      &:nth-child(2n) {
        margin-left: 10px;
      }
    }
    .product-li {
      width: 100%;
      height: 126px;
      font-size: 14px;
    }
    .product-text {
      margin-top: 6px;
      font-size: 13px;
      letter-spacing: 0;
      line-height: 18px;
      height: 36px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #222;
      cursor: pointer;
    }
    .product-text:hover {
      color: #406599;
    }
  }
</style>

