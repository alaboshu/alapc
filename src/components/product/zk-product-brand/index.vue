<template>
  <div class="zk-product-brand" v-if="async">
    <div class="product-brand_box">
      <div class="trademark-box">
        <div class="trademark_box_left" @click="getBrand(viewModel[0].id)">
          <div class="trademark_box_left_img">
            <img v-lazy="viewModel[0].thumbnailUrl" alt="">
          </div>
          <div class="trademark_box_left_text">
            <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-22/5ce4ad50522c0511c895042b.png" alt="">
            <div class="left_text_detail">
              <span>爆款{{viewModel[0].price}}元</span>
              <span>去看看</span>
            </div>
          </div>
        </div>
        <div class="trademark_box_right">
          <ul>
            <li v-for="(item,index) in viewModel" :key="index" @click="getBrand(item.id)">
              <div style="width:50%;">
                <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-22/5ce4b74e522c0511c896a00f.png" alt="" class="logo_img">
                <span>会员低价爆款</span>
                <span>去看看</span>
              </div>
              <img v-lazy="item.thumbnailUrl" alt="" class="content_img">
            </li>
          </ul>
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
        for (let i = 0; i < this.widgetModel.length; i++) {
          if (i < 4) {
            this.viewModel.push(this.widgetModel[i])
          }
        }
        this.async = true
      },
      getBrand (id) {
        this.$router.push('/product/show?id=' + id)
      }
    }
  }
</script>
