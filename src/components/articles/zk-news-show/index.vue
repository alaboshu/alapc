<template>
  <div class="zk-news-show" v-if="async">
    <div class="pc-p-news-show">
      <div class="p-news-show">
        <div class="article-title">
          <h2>{{viewModel.title}}</h2>
        </div>
        <div class="article-source">
          {{viewModel.intro}}
        </div>
        <div class="article-img">
          <img class="imgaes" :src="viewModel.imageUrl" alt="">
        </div>
        <div class="article-content" v-html="viewModel.content">
        </div>
        <div class="article-author">
          <span>作者: {{viewModel.author}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
  import { ARTICLE_ARTICLEDETAIL_GET } from '@/service/core/apiUrl.js'
  export default {
    
    data () {
      return {
        widgetModel: '',
        viewModel: '',
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
      async  init () {
        let parameter = {
          id: this.$route.query.id
        }
        var response = await this.$api.httpGet(ARTICLE_ARTICLEDETAIL_GET, parameter)
        this.viewModel = response.result
        this.async = true
      }
    }
  }
</script>
<style lang="scss">
  @import "~_style/index.scss";
  .pc-p-news-show {
    font-size: $gl-size-base;
    .p-news-show {
      width: 100%;
      padding: 20px;
      .article-title {
        h2 {
          font-size: 28px;
          line-height: 40px;
          font-weight: 700;
        }
      }
      .article-source {
        font-size: 13px;
        line-height: 2;
        color: #999;
      }
      .article-img {
        margin-top: 22px;
        width: 100%;
      }
      .article-content {
        margin-top: 22px;
        font-size: 16px;
        line-height: 24px;
        color: #333;
        text-align: justify;
        p {
          img {
            width: 100%;
          }
        }
      }
      .article-author {
        margin-top: 22px;
        text-align: right;
        font-size: 13px;
        line-height: 2;
        color: #999;
      }
    }
  }
</style>

