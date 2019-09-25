<template>
  <div>
    <div class="order_list">
      <div class="order_list_top">
        <div class="order_list_left">
          <div>
            <span>订单编号:</span>
            <span> 9000000433 </span>
            <span> 2019-03-30 16:53</span>
          </div>
        </div>
        <div class="order_list_top_center">自营店铺</div>
        <div class="order_list_top_right">
          <i class="iconfont zk-tree"></i>
          八达中路252-1号(东星酒楼右旁进)
        </div>
      </div>
      <div class="order_list_cont">
        <div class="order_list_cont_left">
          <img src="http://img2.imgtn.bdimg.com/it/u=2454768104,2673256996&fm=26&gp=0.jpg" class="img" alt="">
          <div class="order_cont">
            <p>友人/YOUREN 破壁机Y3新款清新蓝-A16 新款旧款随机发货</p>
            <p> 家用型 <span>305.55元</span></p>
            <div class="order_text">S2B商城</div>
          </div>
        </div>
        <div class="order_list_cont_center">
          <span>296.00</span>X1
        </div>
        <div class="order_list_cont_right">
          <div>
            <p>
              <i class="iconfont zk-debt-me"></i>
              <span>12121212121(梦迪)</span>
            </p>
            <p>12121212121</p>
          </div>
          <div class="price">
            <p>￥150000.00元 </p>
            <p>现金:150000.00元 <span>X1</span></p>
            <p>含运费:0.0</p>
          </div>
          <div class="order">
            <p class="button">代发货</p>
            <p><i class="iconfont zk-userfeedback"></i>订单详情</p>
            <p><i class="iconfont zk-withdrawal"></i>分润详情</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      data: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
      }
    }
  }
</script>

<style lang="scss">
  @import "~./styles/list.scss";

</style>
