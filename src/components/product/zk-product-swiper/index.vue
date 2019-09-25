<template>
  <div class="zk-product-swiper">
    <div class="image-carousel">
      <el-carousel height="430px">
        <el-carousel-item v-for="(item,index) in rotation" :key="index">
          <router-link to="/product/show" class="image-carousel_a" :style="'background-color:'+item.color+';'">
            <div class="image-carousel_box">
              <img class="x-swiper_img" v-lazy="item.image" />
            </div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="left-popup_box">
      <div class="listbox_nav">
        <div class="nav-img1">
          <img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-16/5cdd26a8f54ef63fc4c2ccf0.png" />
        </div>
        <div class="nav-img2">
          <img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-16/5cdd2809f54ef63fc4c2cd16.png" />
        </div>
        <div class="nav-img3">
          <img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-16/5cdd2887f54ef63fc4c2cd3c.png" />
        </div>
        <ul class="nav-ul">
          <li class="nav-ul_li" v-for="(nav,indexs) in classModel" :key="indexs" v-show="indexs<9" @mouseover="classChilren(nav.childClass)">
            <div class="nav-title">{{nav.name}}</div>
            <i class="el-icon-arrow-right"></i>
            <div class="nav-ul_hover">
              <div class="ul_hover-title">热门推荐</div>
              <ul class="hover_ul">
                <li class="hover_ul-li" v-for="(item,index ) in classCModel" :key="index">
                  <router-link :to="'/product/list?ClassIds='+item.id">{{item.name}}</router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="customer-service">
          <div class="customer_title">客服热线</div>
          <div class="customer_number">400-680-9088</div>
        </div>
      </div>
    </div>
    <div class="middle_bottom">
      <div class="middle_bottom-list" v-for="(itemres,indexs) in carouselClass" :key="indexs" :style="'background:url('+itemres.image+') 100% 100% no-repeat'" @click="$router.push(itemres.url)">
        <div class="middle-title">{{itemres.name}}</div>
        <div class="middle-intro">{{itemres.intro}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { PRODUCT_CLASS_GET, ARTICLE_USERNOTICELIST_GET } from '@/service/core/apiUrl'
  
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        middleList: [
          { iamge: 'http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-17/5cde5d6cad49715ce00d3e90.jpg', title: '爆款专区', intro: '热门商品限量库存回馈市场' },
          { iamge: 'http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-17/5cde5e82ad49715ce00d3ec2.jpg', title: '优选专区', intro: '好货在优选质量放心选择无忧' },
          { iamge: 'http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-17/5cde5e85ad49715ce00d3ee8.jpg', title: '品牌专区', intro: '精选全球知名品牌让客户放心购买' }
        ],
        classModel: '',
        noticeModel: '',
        classCModel: '',
        rotation: [],
        carouselClass: []
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
        this.rotation = this.widget.value.links
        var response = await this.$api.httpGet(PRODUCT_CLASS_GET)
        this.classModel = response.result
        var notice = await this.$api.httpGet(ARTICLE_USERNOTICELIST_GET)
        this.noticeModel = notice.result
        this.carouselClass = this.widget.value.carouselClass
        // zk-product-arrival
      },
      classChilren (model) {
        this.classCModel = model
      }
    }
  }
</script>
