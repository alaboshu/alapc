<template>
  <div class="zk-news-rec">
    <div class="pc-p-news-rec" element-path="pc/p-news-rec">
      <div class="news-rec">
        <div class="news-box">
          <h3 class="recommend-title">最新头条</h3>
          <ul class="top-list">
            <li class="list" v-for="(item,index) in viewModel.apiDataList" :key="index" v-show="index<4" @click="getOne(item.id)">
              <div class="list-img">
                <img :src="item.image" class="list-bg">
              </div>
              <div class="list-text-right">
                <p class="list-text-title"> {{item.title}}</p>
                <p class="list-text-intro"> {{item.intro}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="rec-news-product">
        <zk-news-product @getProduct="getProduct"></zk-news-product>
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
        viewModel: '',
        topList: ''
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
        var toplinResponse = await this.$api.httpGet(ARTICLE_TOPLINELIST_GET)
        this.viewModel = toplinResponse.result
      },
      getOne (id) {
        this.$router.push('/articles/topline/index?id=' + id)
        this.$emit('getNewsRec')
      },
      getProduct () {
        this.$emit('getNewsRec')
      }
    }
  }
</script>


<style scoped lang="scss">
  @import "~_style/index.scss";
  .zk-news-rec {
    width: 100%;
    border-top: 2px solid red;
  }
  .pc-p-news-rec {
    width: 100%;
    font-size: $gl-size-base;
    .news-rec {
      background-color: #f8f8f8;
    }
  }
  .rec-news-product {
    margin-top: 15px;
  }
  .top-list {
    padding-left: 20px;
    padding-right: 20px;
  }
  .list {
    border-top: 1px solid #e8e8e8;
    padding: 15px 0px;
    cursor: pointer;
    &:nth-child(1) {
      border-top: none;
    }
  }
  .list-img {
    float: left;
    width: 60px;
    height: 60px;
    overflow: hidden;
  }
  .list-bg {
    width: 60px;
    height: 60px;
    transition: 1s all;
  }
  .list-img:hover .list-bg {
    transform: scale(1.2);
  }
  .list-text-right {
    display: table-cell;
    vertical-align: middle;
    height: 60px;
    margin-left: 20px;
  }
  .list-text-title {
    vertical-align: middle;
    font-size: 13px;
    line-height: 20px;
    max-height: 40px;
    margin-left: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .list-text-intro {
    margin-left: 20px;
    color: #777;
    font-size: 12px;
  }
  .list-icon {
    float: left;
  }
  .icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-top: 10px;
    margin-right: 5px;
    cursor: pointer;
  }
  .phone,
  .comment,
  .time {
    display: inline-block;
    color: #777;
    font-size: 14px;
    margin-top: 8px;
  }
  .recommend-title {
    font-size: 18px;
    color: #222;
    padding-top: 15px;
    padding-left: 20px;
  }
</style>

