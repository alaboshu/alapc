<template>
  <div class="zk-foot">
    <div class="all_box">
      <div class="container">
        <div class="foot_top">
          <img src="https://s-open.qiniuniu99.com/wwwroot/wwwroot/assets/admin/img/logo.jpg" alt="">
        </div>
        <div class="top_contents">
          <div v-for="(item,index) in footContent" :key="index" class="contents_item">
            <p class="item_title">{{item.name}}</p>
            <p class="title_border"></p>
            <ul class="item_middle">
              <li v-for="(Fitem,Findex) in item.list" :key="Findex" class="item_title_name">{{Fitem}}</li>
            </ul>
          </div>

        </div>
        <ul class="foot_bottom">
          <li v-for="(item,index) in bottomList" :key="index"><a href="##" class="bottom_item_a">{{item}}</a></li>
        </ul>
        <div class="firm_name">
          <span class="line"></span>
          <span class="txt">深圳企品汇电子商务科技股份有限公司</span>
          <span class="line"></span>
        </div>
        <p class="brand_news">营业执照：34983573498957349854 &nbsp;| &nbsp;网路经营文化许可证：&nbsp; |&nbsp; 浙网文（2016）0349-219号&nbsp; |&nbsp; 增值电信业务许可证：&nbsp;| &nbsp;浙网文（2016）0349-219号&nbsp; | &nbsp;安全责任书</p>
        <p class="brand_admin_new">互联网经营许可证：&nbsp;48937735KJFHSJ; &nbsp; | &nbsp; 浙网文（2016）0349-219号 &nbsp; |（浙）网械平台备字[2018]第00006号 &nbsp; |</p>
      </div>
    </div>
  </div>
</template>

<script>
  
  // import { HELP_NAV_GET } from '@/service/core/apiUrl'
  export default {
    
    props: {
      value: {},
      footValue: {},
      widgetModel: {}
    },
    data () {
      return {
        isReady: false,
        footModel: '',
        footContent: [
          {
            'name': '新手帮助',
            'list': ['常见服务', '自助服务', '联系客服', '意见反馈']
          },
          {
            'name': '权益保障',
            'list': ['全国包邮', '七天无理由退货', '退货运费补贴', '显示发货']
          },
          {
            'name': '新手帮助',
            'list': ['常见服务', '自助服务', '联系客服', '意见反馈']
          },
          {
            'name': '权益保障',
            'list': ['全国包邮', '七天无理由退货', '退货运费补贴', '显示发货']
          }
        ],
        bottomList: ['关于我们', '招聘信息', '联系我们', '商家注入', '商家后台',
          '阿拉博数商学院', '商家社区', '规则信息', '规则众议院', '有害信息举报', '隐私保护']
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        /*  var config = editSetting
         config.ApiUrl = null
         this.widgetModel = await this.$api.themeWidget(this.widget)
         this.footValue = this.value
         var respose = await this.$api.httpGet(HELP_NAV_GET)
         this.footModel = respose.result
         this.isReady = true */
      }
    }
  }
</script>
<style  lang="scss" scoped>
  @import "./var.scss";
</style>


