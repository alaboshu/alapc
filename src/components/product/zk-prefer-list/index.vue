<template>
  <div class="zk-prefer-list" v-if="viewModel">
    <div class="zk-prefer">
      <div class="zk-prefer-cont">
        <div class="zk-prefer-left">
          <div class="zk-prefer-name">{{viewModel.productItems[6].name}}</div>
          <!-- <div class="zk-prefer-intro">专属男士香水。礼遇男士品味强调甜蜜的空气眷恋</div> -->
          <div class="zk-prefer-type"></div>
          <div class="zk-prefer-price" v-if="viewModel.isFrontShowPrice">￥{{viewModel.productItems[6].price}}
            <span>￥{{viewModel.productItems[6].marketPrice}}</span>
          </div>
          <div class="zk-prefer-price" v-else>
            {{viewModel.priceAlterText}}
          </div>
          <div class="zk-prefer-foot">
            <div class="zk-prefer-button" @click="getProduct(viewModel.productItems[6].id)">立即抢购</div>
            <div class="zk-prefer-collect">
              <img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-20/5ce29bf8313ebe847c834bc8.png" alt="">
            </div>
          </div>
        </div>
        <div class="zk-prefer-right">
          <img v-lazy="viewModel.productItems[6].thumbnailUrl" alt="">
        </div>
      </div>
      <div class="zk-prefer-cont">
        <div class="zk-prefer-right">
          <img v-lazy="viewModel.productItems[1].thumbnailUrl" alt="">
        </div>
        <div class="zk-prefer-left">
          <div class="zk-prefer-name">{{viewModel.productItems[1].name}}</div>
          <!-- <div class="zk-prefer-intro">全面屏 | 侧旋升降结构 | 4800万超清像素全面屏</div> -->
          <div class="zk-prefer-type"></div>
          <div class="zk-prefer-price" v-if="viewModel.isFrontShowPrice">￥{{viewModel.productItems[1].price}}
            <span>￥{{viewModel.productItems[1].marketPrice}}</span>
          </div>
          <div class="zk-prefer-price" v-else>
            {{viewModel.priceAlterText}}
          </div>
          <div class="zk-prefer-foot">
            <div class="zk-prefer-button" @click="getProduct(viewModel.productItems[1].id)">立即抢购</div>
            <div class=" zk-prefer-image">
              <img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-20/5ce29bf8313ebe847c834bc8.png" alt="">
              <img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-20/5ce2a41f313ebe847c834c8d.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        widgetModel: {},
        viewModel: ''
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
        this.widgetModel = await this.$api.themeWidget(this.widget)
        this.viewModel = this.widgetModel.value.result
      },
      getProduct (id) {
        this.$router.push('/product/show?id=' + id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>

