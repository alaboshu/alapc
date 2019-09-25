<template>
  <div class="zk-product-imagelist" v-if="async">
    <div class="product-imagelist-box">
      <div>
        <div class="imagelist-box_list" v-for="(item,index) in viewModel" :key="index" :style="'background:url('+item.thumbnailUrl+') no-repeat;'">
          <div class="imagelist-backgroun">
            <img v-lazy="item.thumbnailUrl" />
          </div>
          <div class="image-conter">
            <img class="image-conter_box" src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-20/5ce29926313ebe847c834b49.png" />
          </div>
          <div class="layer-box">
            <router-link :to="'/product/show?id='+item.id">立即查看</router-link>
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
        imageList: 'http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-20/5ce29922313ebe847c834b23.png',
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
          var songMath = Math.floor(Math.random() * this.widgetModel.length)
          if (i < 5) {
            this.viewModel.push(this.widgetModel[songMath])
          }
        }
        this.async = true
      }
    }
  }
</script>
