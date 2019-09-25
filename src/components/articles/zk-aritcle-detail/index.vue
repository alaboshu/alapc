<template>
  <div id="a" v-if="viewModel">
    <div class="zk-aritcle-detail">
      <div class="container_box">
        <el-container>
          <el-main>
            <div v-if="viewModel.resultList.image"><img :src="api+viewModel.resultList.image" class="detail_img"></div>
            <h1 class="entry-title fusion-post-title" v-if="viewModel.resultList">{{viewModel.resultList.title}}</h1>
            <div class="fusion-column-wrapper" style="background-position:left top;background-repeat:no-repeat;-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;" data-bg-url="">
              <div class="" v-if="viewModel.resultList.content">
                <p v-html="viewModel.resultList.content"></p>
              </div>
            </div>
            <div class="fusion-text" v-if="viewModel.resultList.content">
              <h3 data-fontsize="16" data-lineheight="30" style="color:#2b2e32;font-size:16px;margin:25px 0">{{viewModel.resultList.author}}</h3>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
  
  // import apiBaseUrl from '@/service/config.js'
  import './var.scss'
  import './styles'


  export default {
    
    props: {
      widgetData: {},
      viewModel: {},
      widget: {}
    },
    data () {
      return {
        widgetModel: {},
        contentList: null,
        content: null,
        api: '',
        async: false

      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.async = true
        // $api.baseUrl()
        this.api = 'http://b-open.qiniuniu99.com'
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>
