<template>
  <div class="zk-news-item">
    <div class="pc-p-news-item">
      <!-- <zk-product-item></zk-product-item> -->
      <!-- 新闻列表 -->
      <div class="p-news_list">
        <div class="p-news_list-tobu">
          <span class="p-news_list-information">新闻资讯
            <span class="p-news_list-NEWS">NEWS</span>
          </span>
        </div>
        <div class="p-news_list-conter" v-if="ready">
          <div class="news_list-conter_left">
            <div class="news_list-conter_hot">
              <h2>
                <span class="news_list-conter_sapn">热点</span>{{viewModel.apiDataList[0].title}}！</h2>
              <p>{{viewModel.apiDataList[0].intro}}</p>
            </div>
            <div class="news_list-text">
              <img class="news_list-text_img" :src="viewModel.apiDataList[0].image" />
              <div class="news_list-ul">
                <ul>
                  <li v-for="(item,index) in viewModel.apiDataList" :key="index">
                    <router-link :to="item.url">【热点】 {{item.title}}</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="news_list-conter_right">
            <ul class="news_list-conter_right_ui">
              <li class="news_list-conter_right_uili" v-for="(item,index) in viewModel.apiDataList" :key="index">
                <router-link class="news_list-conter_right_a" :to="item.url">
                  <div class="conter_right-knowledge">
                    <span>牛牛新闻</span>
                  </div>
                  <div class="conter_right-list">
                    <h3 class="conter_right-list_h3">{{item.title}}！</h3>
                    <p class="conter_right-list_p">{{item.intro}}</p>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
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
        ready: false,
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
        this.widgetModel = await this.$api.themeWidget(this.widget)
        var response = await this.$api.httpGet(ARTICLE_TOPLINELIST_GET)
        this.viewModel = response.result
        this.ready = true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~_style/theme.scss";
  .pc-p-news-item {
    font-size: $gl-size-base;
    width: 1200px;
    margin: 40px auto;
    overflow: hidden;
  }

  .p-news_list {
    width: 1200px;
    margin-top: 20px;
  }
  .p-news_list-information {
    font-size: 19px;
  }
  .p-news_list-NEWS {
    font-size: 15px;
    color: #909399;
    margin-left: 5px;
  }
  .p-news_list-tobu {
    position: relative;
  }
  .p-news_list-more {
    color: #303133;
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
  .p-news_list-conter {
    width: 1200px;
    height: 300px;
    border-top: 1px solid #dcdfe6;
    overflow: hidden;
  }
  .news_list-conter_left {
    width: 600px;
    height: 300px;
  }
  .news_list-conter_hot:hover h2 {
    color: $gl-brand;
  }
  .news_list-conter_hot:hover p {
    color: $gl-brand;
  }
  .news_list-conter_right {
    width: 600px;
    height: 260px;
    overflow: hidden;
    padding-left: 44px;
  }
  .news_list-conter_left,
  .news_list-conter_right {
    float: left;
  }
  .news_list-conter_hot {
    margin-top: 5px;
    width: 580px;
    border-bottom: 2px dotted #dcdfe6;
  }
  .news_list-conter_hot h2 {
    font-size: 15px;
    font-weight: 400;
    color: #303133;
  }
  .news_list-conter_hot p {
    margin-top: 5px;
    color: #909399;
    line-height: 25px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .news_list-conter_sapn {
    display: inline-block;
    width: 40px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    font-size: 14px;
    color: $gl-light;
    background-color: $gl-brand;
    margin-right: 15px;
    position: relative;
  }

  .news_list-conter_sapn:before {
    content: "";
    border: 6px solid $gl-brand;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    width: 0px;
    height: 0px;
    position: absolute;
    right: -11px;
    top: 5px;
  }
  .news_list-text {
    width: 600px;
    height: 170px;
    margin-top: 15px;
    overflow: hidden;
  }
  .news_list-text_img {
    width: 300px;
    height: 170px;
  }
  .news_list-ul {
    width: 300px;
    height: 170px;
    padding-left: 20px;
    ul {
      height: 100%;
      overflow-y: auto;
    }
  }
  .news_list-text_img,
  .news_list-ul {
    float: left;
  }
  .news_list-ul > ul > li {
    list-style: disc !important;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 12px;
  }
  .news_list-ul > ul > li > a {
    font-size: 14px;
    color: #303133;
  }
  .news_list-ul > ul > li > a:hover {
    color: $gl-brand;
  }
  .news_list-ul > ul > li:nth-child(1) {
    margin-top: 5px;
  }
  .news_list-conter_right_a {
    overflow: hidden;
    display: block;
  }
  .news_list-conter_right_a:hover .conter_right-list_h3 {
    color: $gl-brand;
    text-decoration: underline;
  }
  .news_list-conter_right_a:hover .conter_right-list_p {
    color: $gl-brand;
    text-decoration: underline;
  }
  .conter_right-list,
  .conter_right-knowledge {
    float: left;
  }
  .conter_right-knowledge {
    text-align: center;
    line-height: 16px;
    background-color: $gl-brand;
    color: $gl-light;
  }
  .conter_right-knowledge span {
    width: 28px;
    display: inline-block;
    margin: 4px 6px;
  }
  .conter_right-list {
    width: 490px !important;
    margin-left: 15px;
  }

  .conter_right-list_h3,
  .conter_right-list_p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .conter_right-list_h3 {
    font-size: 14px;
    color: #303133;
    font-weight: 400;
    margin-top: -3px;
  }
  .conter_right-list_p {
    color: #909399;
    font-size: 14px;
  }
  .news_list-conter_right_uili {
    margin-top: 24px;
  }
</style>
