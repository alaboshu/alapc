<template>
  <div class="zk-product-customer-service">
    <div class="customer-service_box">
      <div class="left_box">
        <div class="left_box-title">客户服务</div>
        <div class="left_box-bottom">
          <div class="bottom-list">
            <div class="bottom-list_icon1"></div>
            <div class="bottom-list_title">40000000000</div>
          </div>
          <div class="bottom-list">
            <div class="bottom-list_icon2"></div>
            <div class="bottom-list_title">在线客服</div>
          </div>
        </div>
      </div>
      <div class="center_box">
        <div class="center_box-title">阿拉博数</div>
        <div class="center_box-intro">网易原创生活类电商品牌，秉承网易一贯的严谨态度，我们深入世界各地，从源头全程严格把控商品生产环节，力求帮消费者甄选到优质的商品</div>
        <div class="center_box-attention">
          <div class="attention-text">关注我们：</div>
          <div class="icon-box attention_icon1"></div>
          <div class="icon-box attention_icon2"></div>
        </div>
      </div>
      <div class="right_box">
        <div class="right_box-title">扫码下载阿拉博数APP</div>
        <div class="right_box-img">
          <img src="http://img4.imgtn.bdimg.com/it/u=4223115080,1535487132&fm=26&gp=0.jpg" />
        </div>
        <div class="right_box-intro">先到先得会员大礼包</div>
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
        widgetModel: {}
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
      }
    }
  }
</script>
