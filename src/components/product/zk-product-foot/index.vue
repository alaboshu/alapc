<template>
  <div class="zk-product-foot" ref="subgroup">
    <div class="all_box">
      <div class="container">
        <div class="top_contents">
          <div v-for="(item,index) in viewModel" :key="index" class="contents_item">
            <p class="item_title">{{item.relationName}}</p>
            <p class="title_border"></p>
            <ul class="item_middle">
              <router-link v-for="(Fitem,Findex) in item.article" :key="Findex" style="color: #fff;" :to="'/articles/help/index?id='+Fitem.id">
                <li class="item_title_name">
                  {{Fitem.title}}
                </li>
              </router-link>
            </ul>
          </div>

        </div>
        <!-- <ul class="foot_bottom">
          <li v-for="(item,index) in bottomList" :key="index"><a href="##" class="bottom_item_a">{{item}}</a></li>
        </ul> -->
        <div class="firm_name">
          <span class="line"></span>
          <span class="txt">深圳企品汇电子商务科技股份有限公司</span>
          <span class="line"></span>
        </div>
        <p class="brand_news">营业执照：91440300MA5FE4H809 &nbsp;| &nbsp;网路经营文化许可证：&nbsp; |&nbsp; 粤ICP备19003261号&nbsp; |&nbsp; 增值电信业务许可证：&nbsp;| &nbsp;粤ICP备19003261号&nbsp; | &nbsp;安全责任书</p>
        <p class="brand_admin_new">互联网经营许可证：&nbsp;48937735KJFHSJ; &nbsp; | &nbsp; 粤ICP备19003261号 &nbsp; |（浙）网械平台备字[2018]第00006号 &nbsp; |</p>
      </div>
    </div>
  </div>
</template>

<script>
  
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        viewModel: [],
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
          '匠芯云商学院', '商家社区', '规则信息', '规则众议院', '有害信息举报', '隐私保护']
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        // this.widgetModel = await this.$api.themeWidget(this.widget, editSetting.config)
        var response = await this.$api.httpGet('Api/Manual/GetManualListByRelation')
        this.viewModel = response.result
      }
    }
  }
</script>
