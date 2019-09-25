<template>
  <div class="zk-product-listitem" v-if="async">
    <div class="product-list">
      <div class="product-list_box" v-for="(item,index) in widgetModel.productItems" :key="index">
        <router-link :to="'/product/show?id='+item.id">
          <div class="picture-box">
            <img v-lazy="item.thumbnailUrl" />
          </div>
          <div class="vertical-demo" v-if="!$user.isLogin()">
            <div class="vertical-demo_title">{{item.name}}</div>
            <div class="vertical-demo_intro" v-if="isPrice">{{widgetModel.priceAlterText}} </div>
            <div class="vertical-demo_intro" v-else>￥{{item.price.toFixed(2)}}</div>
            <div class="vertical-demo_buttom">立即购买</div>
          </div>
          <div class="vertical-demo" v-else>
            <div class="vertical-demo_title">{{item.name}}</div>
            <div class="vertical-demo_money" v-if="item.price">{{item.price.toFixed(2)}}元</div>
            <div class="vertical-demo_original" v-if="item.price">{{item.price.toFixed(2)}}元</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  
  import './var.scss'
  export default {
    
    data () {
      return {
        widgetModel: {},
        async: false,
        isPrice: false,
        loading: true
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
        this.widgetModel = await this.$api.isApiReqGet2(this.widget)
        this.isPrice = this.widget.value.isPrice
        this.async = true
        if (this.widget.value.loading) {
          this.pullRefresh()
        }
        // this.widgetModel = await this.$api.themeWidget(this.widget, editSetting.config)
      },
      pullRefresh () {
        window.addEventListener('scroll', async () => {
          var clientHeight = document.body.clientHeight
          var scrollHeight = document.body.scrollHeight
          var scrollTop = document.body.scrollTop
          var all = Math.ceil(scrollTop + clientHeight)
          if (this.loading && scrollHeight === all) {
            this.loading = false
            var list = await this.$api.isApiReqGet2(this.widget)
            this.widgetModel.productItems = [...this.widgetModel.productItems, ...list.productItems]
          } else {
            this.loading = true
          }
        }, true)
      }
    }
  }
</script>
