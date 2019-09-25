<template>
  <div class="zk-product-brandlist">
    <div class="product-recommend_box">
      <div class="shuffling-conter">
        <div class="carousel_box">
          <div class="left-arrow" @click="onPiece"><img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-20/5ce1ff7bc6b0577590e9326e.png" /></div>
          <div class="right-arrow" @click="nextPage"><img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-20/5ce1ff7fc6b0577590e93288.png" /></div>
          <el-carousel :interval="1000" height="300px" arrow="always" :autoplay="false" :loop="false" ref="carousel">
            <el-carousel-item v-for="(swiperItem,swiperIndex) in carouselModel" :key="swiperIndex">
              <div class="carousel_box-img">
                <img v-lazy="swiperItem.image" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="product-list">
          <div class="product-list_box" v-for="(item,index) in widgetModel" :key="index" @click="getRecommend(item.id)">
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
              <div class="vertical-demo_money">{{item.price}}元</div>
              <div class="vertical-demo_original">{{item.marketPrice}}元</div>
            </div>
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
        carouselModel: '',
        async: true
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
        this.carouselModel = this.widget.value.links
        if (this.widget.value.isPullRefresh) {
          this.pullRefresh()
        }
      },
      onPiece () {
        this.$refs.carousel.prev()
      },
      nextPage () {
        this.$refs.carousel.next()
      },
      getRecommend (id) {
        this.$router.push('/product/show?id=' + id)
      },
      pullRefresh () {
        window.addEventListener('scroll', async () => {
          var clientHeight = document.body.clientHeight
          var scrollHeight = document.body.scrollHeight
          var scrollTop = document.body.scrollTop
          var all = Math.ceil(scrollTop + clientHeight)
          if (this.async && scrollHeight === all) {
            this.async = false
            var list = await this.$api.isApiReqGet(this.widget)
            this.widgetModel = [...this.widgetModel, ...list]
          } else {
            this.async = true
          }
        }, true)
      }
    }
  }
</script>
