<template>
  <div class="zk-product-mustsee">
    <div class="mustsee-box">
      <div class="mustsee-box">
        <div class="mustsee-box_list" v-for="(item,index) in widgetModel" :key="index" v-show="index<4" @click="mustseeRight(item.id)">
          <div class="p-mustsee">
            <div class="mustsee-left">
              <img v-lazy="item.thumbnailUrl" />
            </div>
            <div class="mustsee-right">
              <div class="mustsee-right_title">{{item.name}}</div>
              <!-- <div class="mustsee-right_intro"><span class="intro-span">全面屏</span><span class="intro-span">侧旋升降结构</span></div>
              <div class="pixelate-text">4800万高清像素</div> -->
              <div class="pixelate-money" v-if="$user.isLogin()">￥{{item.price}}</div>
              <div class="mustsee_buttom" v-else @click="getLogin">登录查看</div>
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
        viewModel: []
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
      },
      getLogin () {
        this.$router.push('/login')
      },
      mustseeRight (id) {
        if (this.$user.isLogin()) {
          this.$router.push('/product/show?id=' + id)
        }
      }
    }
  }
</script>
