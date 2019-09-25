<template>
  <div class="zk-product-arrival">
    <div class="product-recommend_box" v-if="viewModel">
      <div class="product-exhibition">
        <div class="on-piece" @click="onPiece"><img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-19/5ce0f5f0a8ee3c271041f76e.png" /></div>
        <div class="next-page" @click="nextPage"><img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-19/5ce0f5f3a8ee3c271041f776.png" /></div>
        <el-carousel :interval="1000" arrow="always" height="344px" :autoplay="false" ref="carousel" :loop="false" @change="onChang">
          <el-carousel-item v-for="(item,index) in pageSize" :key="index" :name="String(index)">
            <div class="carousel_box">
              <div class="carousel_box-list" v-for="(item,index) in viewModel" :key="index">
                <router-link :to="'/product/show?id='+item.id">
                  <div class="a-portlet_box">
                    <img class="a-portlet_bimg" v-lazy="item.thumbnailUrl" onerror="javascript:this.src='http://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-27/5cebe282b41815014cb56700.png'" />
                  </div>
                  <div class="arrival-box">
                    <div class="arrival-box_title">{{item.name}}</div>
                    <div class="arrival-box_buttom">立即抢购</div>
                  </div>
                </router-link>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
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
        carouselIndex: 0,
        viewModel: [],
        list: [],
        pageSize: ''
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
        this.pageSize = Math.ceil(this.widgetModel.length / 4)
        for (let i = 0; i < this.widgetModel.length; i += 4) {
          this.list.push(this.widgetModel.slice(i, i + 4))
          this.viewModel = this.list[0]
        }
      },
      onPiece () {
        this.$refs.carousel.prev()
      },
      nextPage () {
        this.$refs.carousel.next()
      },
      onChang (val) {
        this.viewModel = this.list[val]
      }
    }
  }
</script>
