<template>
  <div class="zk-news-list" :widget="widgetModel">
    <ul class="top-list">
      <li class="list_box" v-for="(item,index) in viewModel.apiDataList" :key="index" @click="getList(item.id)">
        <div class="list-img">
          <img :src="item.image" class="list-bg">
        </div>
        <div class="list-text-right">
          <div class="text-right_top">
            <router-link to="" class="list-text-title"> {{item.title}}</router-link>
          </div>
          <div class="iconconter">
            <p class="list-icon"><img src="https://p2.pstatp.com/large/6ee00000fe8c97a4838d" class="icon"></p>
            <router-link to="" class="phone">{{item.intro}}&nbsp;</router-link>
            <!-- <router-link to="" class="comment">215评论&nbsp;⋅</router-link>
            <span class="time">{{item.extra}}</span> -->
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  
  // import bus from '../zk-news-nav/bridge'
  import { ARTICLE_TOPLINELIST_GET } from '@/service/core/apiUrl'
  export default {
    
    data () {
      return {
        widgetModel: '',
        viewModel: '',
        valueof: '',
        jumpId: 0
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
      onZknewslist (Id) {
        this.valueof = Id
      },
      getList (id) {
        this.$router.push('/articles/topline/index?id=' + id)
      },
      async newsList (id) {
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss">
  @import "~_style/index.scss";
  .zk-news-list {
    width: 100%;
    .top-list {
      width: 100%;
      padding: 0px 15px;
      .list_box {
        width: 100%;
        display: flex;
        border-top: 1px solid #f0f0f0;
        padding: 15px 0px;
        .list-text-right {
          flex: 1;
          width: 100%;
          padding-left: 15px;
          .text-right_top {
            .list-text-title {
              display: block;
              line-height: 24px;
              margin-top: 15px;
              font-size: 20px;
              font-weight: 500;
              color: #222222;
              transition: color 0.2s ease;
              &:hover {
                color: #406599;
              }
            }
          }
          .iconconter {
            max-width: 580px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;
            margin-top: 5px;
            .list-icon {
              .icon {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                margin-top: 10px;
                margin-right: 5px;
                cursor: pointer;
              }
            }
            .phone,
            .comment,
            .time {
              color: #777;
              font-size: 14px;
              margin-top: 8px;
            }
            .time {
              flex: 1;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .list-img {
          width: 156px;
          height: 100px;
          overflow: hidden;
          .list-bg {
            width: 100%;
            height: 100%;
            transition: 0.5s all;
          }
        }
        &:hover {
          .list-img {
            .list-bg {
              transform: scale(1.1);
            }
          }
        }
      }
    }
  }
</style>

