<template>
  <div class="zk-product-head">
    <div class="head-middle">
      <div class="head-login">
        <router-link to="/">
          <img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-15/5cdbbdec85ec97330c0642fe.png" />
        </router-link>
      </div>
      <div class="head-search">
        <div class="middle-center">
          <div class="head-search_box">
            <div class="head-search_input">
              <img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-15/5cdbc005afe420358c40e48d.png" class="search_img" />
              <input placeholder="热门搜索" class="search_box" v-model="inputModel" @keyup.enter="submit" />
            </div>
            <div class="search_box-btn" @click="search">搜索</div>
          </div>
          <div class="middle-center_cart" @click="toCart">
            <img class="cart-img" src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-15/5cdbc6c6afe420358c410e46.png" />
            <span class="cart-number" v-if="cartLength !== 0&&cartModel" :title="cartLength">{{cartLength}}</span>
          </div>
        </div>
        <div class="search-list">
          <div class="search-list_a" v-for="(item,index) in searchList" :key="index" @click="searchKeyWord(item.name)">{{item.name}}</div>
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
        inputModel: '',
        cartModel: '',
        cartLength: '',
        searchList: [
          { name: '女装' },
          { name: '连衣裙' },
          { name: '婴儿用品' }
        ]
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
        var para = {
          loginUserId: ''
        }
        if (this.$user.loginUser() !== null) {
          para.userId = this.$user.loginUser().id
        }
        var respoen = await this.$api.httpGet('/api/cart/getcart', para)
        if (respoen.status === 1) {
          this.cartModel = respoen.result
          this.cartLength = this.cartModel.totalCount
        }
      },
      submit (e) {
        if (e.keyCode === 13) {
          this.search()
        }
      },
      search () {
        window.location = '/product/list?Keyword=' + this.inputModel
      },
      searchKeyWord (keyWord) {
        window.location = '/product/list?Keyword=' + keyWord
      },
      toCart () {
        // 跳转购物车
        if (this.$user.isLogin()) {
          this.$router.push('/order/cart')
        } else {
          // 未登录跳转登录页面
          this.$user.toLogin()
        }
      }
    }
  }
</script>
