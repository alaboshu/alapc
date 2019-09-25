<template>
  <div class="zk-product-swiperItem" v-if="async">
    <div class="product-recommend_box">
      <div class="box-head" v-if="widget.value.istitle">
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
      </div>
    </div>
  </div>
</template>

<script>
  
  import './var.scss'


  export default {
    
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
        this.rotation = this.widget.value.links
        this.async = true
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
