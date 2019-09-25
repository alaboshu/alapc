<template>
  <div class="zk-product-goods" v-if="async">
    <div class="product-goods_box">
      <div class="zk-product-theme">
        <div>PREFEREO GOODS</div>
        <div class="zk-product-weight">优选好货</div>
        <div class="zk-product-day">每日优选总有动心</div>
      </div>
      <ul class="zk-product-all">
        <li class="zk-product-list" v-for="(item, index) in widgetModel" :key="index">
          <div class="zk-product-image">
            <img v-lazy="item.thumbnailUrl" alt="">
          </div>
          <div class="zk-product-name">{{item.name}}</div>
          <div class="zk-product-intro"><span>￥</span>{{item.price.toFixed(2)}}</div>
          <div class="zk-product-gradual">
            <div class="zk-gradual-name">{{item.name}}</div>
            <div class="zk-product-price">{{item.price.toFixed(2)}}</div>
            <div class="zk-product-button" @click="getGoods(item.id)" v-if="$user.isLogin()">立即购买/登录</div>
            <div class="zk-product-button" @click="$router.push('/login')" v-else>立即登录</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
  export default {
    name: '',
    data () {
      return {
        widgetModel: {},
        async: false
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
        this.widgetModel = await this.$api.isApiReqGet(this.widget)
        this.async = true
      },
      getGoods (id) {
        this.$router.push('/product/show?id=' + id)
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "./var.scss";
</style>
