<template>
  <div id="a">
    <div class="zk-ariticle-image-list">
      <div class="container_box">
        <el-row :gutter="20" style="padding:20px 45px">
          <el-col :span="6" v-for="(item,index) in contentList" :key="index">
            <router-link :to="item.url">
              <div class="grid-content bg-purple">
                <img :src="api+item.image" alt="" style="width:100%;height:200px" class="detail_img">
                <div class="fusion-post-content-wrapper" style="padding:30px 25px 20px 25px;">
                  <div class="fusion-post-content post-content">
                    <h2 class="blog-shortcode-post-title entry-title">
                      <a :href="item.url">{{item.title}}</a>
                    </h2>
                    <p class="fusion-single-line-meta">
                      <span class="fn"></span>
                      <span class="fusion-inline-sep">|</span>
                      <a :href="item.url"><span>详情</span></a>
                    </p>
                    <div class="fusion-content-sep sep-double sep-solid" style="border-color:#eaeaea;"></div>
                    <div class="fusion-post-content-container">
                      <p>{{item.intro}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import apiBaseUrl from '@/service/config.js'
  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        widgetModel: {},
        shows: false,
        num: 0,
        contentList: [],
        api: ''
      }
    },
    props: {
      widget: {},
      widgetData: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        // var type = this.$crud.getType()
        var para = {
          type: this.widgetData.type
        }
        this.widgetModel = await this.$api.httpGet('/Api/Auto/news', para)
        if (this.widgetModel.result.resultList !== undefined) {
          this.contentList = this.widgetModel.result.resultList
        }
        this.api = apiBaseUrl.apiBaseUrl
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
  }
</style>
