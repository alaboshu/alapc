<template>
  <div class="zk-product-flashsale" v-if="async">
    <div class="product-recommend_box">
      <div class="flashsale-exhibition">
        <div class="flashsale-left" :style="' background: url('+widget.value.login+') no-repeat;'">
          <div class="flashsale-left_title">今日专场</div>
          <div class="surplus-introe">距离结束还剩</div>
          <div class="count-down">
            <span>{{totalTime}}</span>:<span>{{second}}</span>:<span>{{millisecond}}</span></div>
          <div class="check-button">查看更多</div>
        </div>
        <div class="flashsale-right">
          <div class="flashsale-right_list" v-for="(item,index) in widgetModel.productItems" :key="index" v-show="index<4">
            <router-link :to="'/product/show?id='+item.id">
              <div class="commodity-box">
                <img v-lazy="item.thumbnailUrl" />
              </div>
            </router-link>
            <div class="commodity-conter">
              <div class="commodity-top">
                <div class="commodity-top_title">{{item.name}}</div>
                <div class="commodity-top_intro" v-if="$user.isLogin()"><span>￥</span>{{item.price}}</div>
                <div class="commodity-top_intro" v-else-if="isPrice">{{widgetModel.priceAlterText}}</div>
                <div class="commodity-top_intro" v-else><span>￥</span>{{item.price}}</div>
              </div>
              <div class="buying-spree" v-if="!$user.isLogin()">
                <div class="commodity-buttom buying-btn1">立即抢购</div>
                <div class="commodity-buttom buying-btn2" @click="snapUp">登录抢购</div>
              </div>
              <div class="buying-spree" v-else>
                <router-link :to="'/product/show?id='+item.id">
                  <div class="commodity-buttom">立即抢购</div>
                </router-link>
              </div>
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
        viewModel: [],
        async: false,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        totalTime: 0,
        isPrice: false
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      this.countDown()
    },
    methods: {
      async init () {
        this.widgetModel = await this.$api.isApiReqGet2(this.widget)
        this.isPrice = this.widget.value.isPrice
        this.async = true
      },
      countDown () {
        var than = this
        var stopDown = setInterval(function () {
          var endtime = new Date('2019/6/23,20:19:00')// 结束时间
          var nowtime = new Date()// 获取当前时间
          var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000)
          than.hour = parseInt(lefttime / (24 * 60 * 60))
          than.minute = parseInt(lefttime / (60 * 60) % 24)
          than.second = parseInt(lefttime / 60 % 60)
          than.millisecond = parseInt(lefttime % 60)
          var totalMinutes = than.hour * 24
          than.totalTime = totalMinutes + than.minute
          if (than.hour < 10 && than.hour >= 0) {
            than.hour = '0' + than.hour
          }
          if (than.minute < 10 && than.minute >= 0) {
            than.minute = '0' + than.minute
          }
          if (than.second < 10 && than.second >= 0) {
            than.second = '0' + than.second
          }
          if (than.millisecond < 10 && than.millisecond >= 0) {
            than.millisecond = '0' + than.millisecond
          }
          if (than.totalTime < 10 && than.totalTime >= 0) {
            than.totalTime = '0' + than.totalTime
          }
          if (than.totalTime <= 0 && than.second <= 0 && than.millisecond <= 0) {
            clearInterval(stopDown)
            than.totalTime = '00'
            than.second = '00'
            than.millisecond = '00'
          }
        }, 1000)
      },
      snapUp () {
        this.$router.push('/login')
      }
    }
  }
</script>
