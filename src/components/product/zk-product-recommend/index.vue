<template>
  <div class="zk-product-recommend">
    <div class="product-recommend_box">
      <div class="product-exhibition">
        <div class="exhibition_box" v-for="(items,indexs) in widgetModel.productItems" :style="'background:'+bgColor[indexs]" :key="indexs" v-show="indexs<2">
          <router-link :to="'/product/show?id='+items.id">
            <!-- <img class="exhibition-img" v-lazy="items.thumbnailUrl" /> -->
            <img src="" class="exhibition-image" v-lazy="items.thumbnailUrl" alt="">
            <div class="text_box">
              <div class="text_box-title">{{items.name}}</div>
              <div class="text_box-money" v-if="$user.isLogin()">{{items.price.toFixed(2)}}元</div>
              <div class="text_box-money" v-else>{{isPrice?widgetModel.priceAlterText:items.price.toFixed(2)+'元'}}</div>
            </div>
          </router-link>
        </div>
        <div class="tandem-list">
          <router-link v-for="(item,index) in widgetModel.productItems" :key="index" :to="'/product/show?id='+item.id" class="tandem-list_a" v-show="index>1&&index<4">
            <div class="tandem-list_box" :style="'background-color:'+backGroundList[index]+';'">
              <div class="tandem-left">
                <div class="tandem-title">{{item.name}}</div>
                <div class="tandem-money" v-if="item.price && $user.isLogin()">{{item.price.toFixed(2)}}元</div>
                <div class="tandem-money" v-else>{{isPrice?widgetModel.priceAlterText:item.price.toFixed(2)+'元'}}</div>
              </div>
              <div class="tandem-right">
                <img v-lazy="item.thumbnailUrl" />
              </div>
            </div>
          </router-link>
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
        backColor: '#eff2f9',
        backGroundList: ['', '', '#eff2f9', '#ffe2e0'],
        viewModel: [],
        isPrice: false,
        bgColor: ['#EEF5FF', '#E1FDFE']
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
      }
    }
  }
</script>
