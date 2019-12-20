<template>
  <div id="a">
    <div class="zk-swiper-nav">
      <div class="line"></div>
      <div class="container">
        <div class="all_box">
          <div class="swiper_left">
            <ul class="swiper_left_list" @mouseleave="shows=false">
              <li v-for="(item,index) in classModel" @mouseenter="swiperNav(index)" :key="index" class="swiper_left_item">
                <span class="total_name"><a href="##">{{item.name}}</a></span>
              </li>
              <transition name="one">
                <div class="list_content" v-if="shows">
                  <h2 class="list_title">热门推荐</h2>
                  <div class="list_all" v-for="(item,index) in listContent" :key="index">
                    <p class="all_name" @click="goLinks(item.id)">
                      <router-link :to="'/product/list?ClassIds='+ item.id">{{item.name}}</router-link>
                    </p>
                  </div>
                </div>
              </transition>
            </ul>
          </div>
          <div class="swiper_middle">
            <div class="swiper_list">
              <el-carousel :interval="5000" arrow="hover">
                <el-carousel-item v-for="(item,index) in imgList" :key="index">
                  <img :src="item">
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="middle_bottom">
              <ul>
                <li v-for="(item,index) in bottomList" :key="index" class="bottom_item">
                  <img :src="item.img" alt="">
                  <div>
                    <p class="bottom_item_name">{{item.name}}</p>
                    <p class="bottom_item_text">{{item.text}}</p>
                    <p class="bottom_item_label">一件代发</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="swiper_right">
            <div class="right_top">
              <h1>店铺小号核身认证</h1>
              <span>绑定淘店享权益 店铺信息私密保护</span>
            </div>
            <div class="action">
              <a href="#" class="btn btn-login">立即登录认证</a>
            </div>
            <ul class="right_content">
              <li v-for="(item,index) in rightList" :key="index" class="right_content_item">
                <p><span class="dot"></span>{{item.name}}</p>
                <p>{{item.text}}</p>
              </li>
            </ul>
            <div class="right_bottom">
              <p class="entry_admin">进入淘管家</p>
            </div>
            <div class="right_foot">
              公告：绑定淘店享权益 店铺信息私密保护
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
        shows: false,
        listContent: [],
        imgList: [
          'https://img.alicdn.com/tfs/TB1nugvwFzqK1RjSZFvXXcB7VXa-715-350.png',
          'https://img.alicdn.com/tfs/TB1rxh3w7voK1RjSZFwXXciCFXa-715-350.png',
          'https://img.alicdn.com/tfs/TB1nugvwFzqK1RjSZFvXXcB7VXa-715-350.png',
          'https://img.alicdn.com/tfs/TB1rxh3w7voK1RjSZFwXXciCFXa-715-350.png',
          'https://img.alicdn.com/tfs/TB10TGZx4TpK1RjSZFGXXcHqFXa-715-350.png'
        ],
        bottomList: [
          {
            'name': '代发帮',
            'img': 'https://img.alicdn.com/tfs/TB1Bio.fBfH8KJjy1XbXXbLdXXa-140-140.png',
            'text': '0库存不囤货'
          },
          {
            'name': '代发帮',
            'img': 'https://img.alicdn.com/tfs/TB1k_l3fILJ8KJjy0FnXXcFDpXa-140-140.png',
            'text': '代销采购不花钱'
          },
          {
            'name': '代发帮',
            'img': 'https://img.alicdn.com/tfs/TB1fM8MfLDH8KJjy1XcXXcpdXXa-140-140.png',
            'text': '免费0赊账'
          }
        ],
        rightList: [
          {
            'name': '私密认证享优惠',
            'text': '淘店信息保护 享分销渠道优惠'
          },
          {
            'name': '免费赊账',
            'text': '绑定淘宝店铺 提升赊账额度'
          },
          {
            'name': '分销工具',
            'text': '订单回流 自动分账 库存同步'
          }
        ],
        classModel: []
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
        var response = await this.$api.httpGet('/api/product/class')
        this.classModel = response.result
      },
      swiperNav (index) {
        this.shows = true
        this.listContent = this.classModel[index].childClass
      },
      goLinks (id) {
        window.location.href = '/product/show?id=' + id
      }
    }
  }
</script>
