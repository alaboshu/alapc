<template>
  <div class="zk-product-selection" v-if="async">
    <div class="product-recommend_box">
      <div class="selection-exhibition">
        <router-link :to="'/product/show?id='+viewModel[5].id">
          <div class="selection_left">
            <div class="selection_img">
              <img v-lazy="viewModel[5].thumbnailUrl" />
            </div>
            <div class="selection_conter">
              <div class="selection_conter-title">{{viewModel[5].name}}</div>
              <div class="selection_conter-intro" v-if="$user.isLogin()"><span>￥</span>{{viewModel[5].price.toFixed(2)}}</div>
              <div class="selection_conter-intro" v-else-if="isPrice">{{widgetModel.priceAlterText}}</div>
              <div class="selection_conter-intro" v-else><span>￥</span>{{viewModel[5].price.toFixed(2)}}</div>
            </div>
          </div>
        </router-link>
        <div class="selection_right">
          <div class="selection_right-list" v-for="(item,index) in viewModel" :key="index">
            <router-link :to="'/product/show?id='+item.id">
              <div class="right-list_box"><img v-lazy="item.thumbnailUrl" /></div>
              <div class="right-list_conter">
                <div class="right-list_conter-title">{{item.name}}</div>
                <div class="right-list_conter-intro" v-if="$user.isLogin()"><span>￥</span>{{item.price.toFixed(2)}}</div>
                <div class="right-list_conter-intro" v-else-if="isPrice">{{widgetModel.priceAlterText}}</div>
                <div class="right-list_conter-intro" v-else><span>￥</span>{{item.price.toFixed(2)}}</div>
              </div>
              <div class="conter-buttom_box" v-if="!$user.isLogin()">
                <div class="right-list_conter-title">{{item.name}}</div>
                <div class="selection_buttom">登录查看</div>
              </div>
            </router-link>
          </div>
        </div>
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
        async: false,
        isPrice: false
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
        for (let i = 0; i < this.widgetModel.productItems.length; i++) {
          if (i < 6) {
            this.viewModel.push(this.widgetModel.productItems[i])
          }
        }
        this.async = true
      }
    }
  }
</script>
