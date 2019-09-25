<template>
  <div class="zk-news-nav" v-if="async">
    <!-- <div class="pc-p-news-nav">
      <div class="nav-lis">
        <ul class="list">
          <li class="li" v-for="(item,index) in message" :key="index" :class="{'active':current==index}" @click="changeCurrent(index,item.relationId)">{{item.className}}</li>
        </ul>
      </div>
    </div> -->
    <div class="pc-zk-news-list" v-if="!showqh">
      <zk-news-list ref="news_list"></zk-news-list>
    </div>
    <div class="pc-zk-news-show" v-else>
      <zk-news-show ref="news_show"></zk-news-show>
    </div>
    <div class="pc-zk-news-rec">
      <zk-news-rec @getNewsRec="getNewsRec"></zk-news-rec>
    </div>
  </div>
</template>

<script>
  
  import { ARTICLE_TOPLINELIST_GET } from '@/service/core/apiUrl'
  export default {
    
    data () {
      return {
        widgetModel: '',
        message: '',
        current: 0,
        showqh: false,
        async: false
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
      async init () {
        var topListResponse = await this.$api.httpGet(ARTICLE_TOPLINELIST_GET)
        this.widgetModel = topListResponse.result
        var ArticleClassify = await this.$api.httpGet('Api/Article/ArticleClassify')
        this.message = ArticleClassify.result
        if (this.$route.query.id !== undefined) {
          this.showqh = true
        } else {
          this.showqh = false
        }
        this.async = true
      },
      changeCurrent (index, itemId) {
        this.$router.push('/articles/topline/index')
        this.current = index
        var this_ = this
        setTimeout(function () {
          this_.$refs.news_list.newsList(itemId)
        }, 100)
      },
      getNewsRec () {
        var this_ = this
        setTimeout(function () {
          this_.$refs.news_show.init()
        }, 100)
      }
    },
    watch: {
      $route: {
        handler () {
          this.init()
        },
        deep: true
      }
    }
  }
</script>


<style scoped lang="scss">
  @import "~_style/index.scss";
  .zk-news-nav {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    .pc-p-news-nav {
      width: 110px;
      font-size: $gl-size-base;
      margin: 0px 10px;
    }
    .pc-zk-news-list {
      flex: 1;
    }
    .pc-zk-news-show {
      flex: 1;
      border: 1px solid #e5e5e5;
      margin-right: 15px;
    }
    .pc-zk-news-rec {
      width: 300px;
    }
  }
  .list {
    display: flex;
    flex-direction: column;
  }
  .li {
    width: 110px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: white;
    color: #444;
    font-size: 16px;
    margin-bottom: 2px;
    border-radius: 5px;
    cursor: pointer;
  }
  .active {
    color: white;
    background-color: #ed4040;
  }
  .li:hover {
    color: white;
    background-color: #ed4040;
  }
</style>


