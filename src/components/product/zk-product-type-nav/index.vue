<template>
  <div class="zk-product-type-nav">
    <div class="zk-product-type-nav_box">
      <div class="product-nav_title"><span>您所在</span>><span>优选区</span></div>
      <div class="product-nav_swiper">
        <div class="left-arrow" @click="onPiece"><img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-20/5ce1ff7bc6b0577590e9326e.png" /></div>
        <div class="right-arrow" @click="nextPage"><img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-20/5ce1ff7fc6b0577590e93288.png" /></div>
        <el-carousel :interval="1000" height="300px" arrow="always" :autoplay="false" :loop="false" ref="carousel">
          <el-carousel-item v-for="item in 4" :key="item">
            <div class="carousel_box-img">
              <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=275377869,874401419&fm=27&gp=0.jpg" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="nav-list">
        <div class="type_nav_box_top">
          <span>分类：</span>
          <ul>
            <li v-for="(item,index) in dataList" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="type_nav_box_bottom">
          <span>排序：</span>
          <div class="type">
            <span class="type_title">价格</span>
            <div class="type_images">
              <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-22/5ce4f077522c0511c897a6ee.png" alt="">
              <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-22/5ce4f071522c0511c89766a1.png" alt="">
            </div>
          </div>
          <div class="type">
            <span class="type_title">上架时间</span>
            <div class="type_images">
              <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-22/5ce4f077522c0511c897a6ee.png" alt="">
              <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-22/5ce4f071522c0511c89766a1.png" alt="">
            </div>
          </div>
          <div class="type">
            <span class="type_title">销量</span>
            <div class="type_images">
              <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-22/5ce4f071522c0511c89766a1.png" class="sold_count" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="nav-list_item">
        <div class="product-list_box" v-for="(item,index) in 15" :key="index">
          <div class="picture-box">
            <img src="https://s-open.qiniuniu99.com//wwwroot/uploads/api/2019-05-14/5cda703f7c8e8323a47730a0.jpg_240X240.jpg" />
          </div>
          <div class="vertical-demo" v-if="!$user.isLogin()">
            <div class="vertical-demo_title">卡屋双层煮蛋机</div>
            <div class="vertical-demo_intro">原创设计德国榉木</div>
            <div class="vertical-demo_buttom">立即购买</div>
          </div>
          <div class="vertical-demo" v-else>
            <div class="vertical-demo_title">卡屋双层煮蛋机</div>
            <div class="vertical-demo_money">582.00元</div>
            <div class="vertical-demo_original">582.00元</div>
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
        dataList: [
          '全部',
          '清凉穿搭',
          '夏季爆款',
          '卫衣',
          'POLO男士衬衫',
          '清凉穿搭',
          '夏季爆款',
          '卫衣',
          'POLO男士衬衫',
          '清凉穿搭',
          '夏季爆款',
          '卫衣',
          'POLO男士衬衫'
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
        // this.widgetModel = await this.$api.themeWidget(this.widget, editSetting.config)
      },
      onPiece () {
        this.$refs.carousel.prev()
      },
      nextPage () {
        this.$refs.carousel.next()
      }
    }
  }
</script>
