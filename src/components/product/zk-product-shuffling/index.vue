<template>
  <div class="zk-product-shuffling" v-if="async" ref="subgroup">
    <div class="product-recommend_box">
      <div class="box-head">
        <div class="box-head_title">{{widget.value.title}}</div>
        <div class="box-head_intro"><span>{{widget.value.intro}}</span></div>
      </div>
      <div class="shuffling-conter">
        <div class="carousel_box">
          <div class="left-arrow" @click="onPiece"><img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-20/5ce1ff7bc6b0577590e9326e.png" /></div>
          <div class="right-arrow" @click="nextPage"><img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-20/5ce1ff7fc6b0577590e93288.png" /></div>
          <el-carousel :interval="1000" height="300px" arrow="always" :autoplay="false" :loop="false" ref="carousel">
            <el-carousel-item v-for="(item, index) in rotation" :key="index">
              <div class="carousel_box-img">
                <img v-lazy="item.image" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="product-list">
          <div class="product-list_box" v-for="(item,index) in widgetModel" :key="index">
            <router-link :to="'/product/show?id='+item.id">
              <div class="picture-box">
                <img v-lazy="item.thumbnailUrl" />
              </div>
              <div class="vertical-demo" v-if="!$user.isLogin()">
                <div class="vertical-demo_title">{{item.name}}</div>
                <div class="vertical-demo_intro">原创设计德国榉木</div>
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
        rotation: [],
        async: false,
        inshow: true
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
        // this.widgetModel = await this.$api.themeWidget(this.widget)
        this.widgetModel = await this.$api.isApiReqGet(this.widget)
        this.rotation = this.widget.value.links
        if (this.widget.value.isPullRefresh) {
          this.pullRefresh()
        }
        this.async = true
      },
      onPiece () {
        this.$refs.carousel.prev()
      },
      nextPage () {
        this.$refs.carousel.next()
      },
      pullRefresh () {
        window.addEventListener('scroll', async () => {
          var clientHeight = document.body.clientHeight
          var scrollHeight = document.body.scrollHeight
          var scrollTop = document.body.scrollTop
          var all = Math.ceil(scrollTop + clientHeight)
          if (this.inshow && scrollHeight === all) {
            this.inshow = false
            var list = await this.$api.isApiReqGet(this.widget)
            this.widgetModel = [...this.widgetModel, ...list]
          } else {
            this.inshow = true
          }
        }, true)
      }
    }
  }
</script>
