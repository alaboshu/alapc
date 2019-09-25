<template>
  <x-border title="短信充值" color="success">
    <div class="admin-sms-recharge">
      <div class="recharge-box">
        <ul>
          <li class="recharge-box_li" v-for="(item,index) in comboList" :key="index" :class="{'recharge_hover':rechargeIndex==index}" @click="taprecharge(index)">
            <div class="smsMode_shop">
              <div class="sms_combo">{{item.name}}</div>
              <div class="sms_desc">
                <span class="sms_desc-title">{{item.cpus}}<span class="sms_desc-conter">条</span></span>
              </div>
              <div class="sms_price">
                <span class="sms_price-span1">￥<span class="span1-number">{{item.prick}}</span></span>
                <span class="sms_price-span2">{{item.yanPrick}}</span>
              </div>
              <div class="singlePrice">{{item.xiPrick}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="buy-immediately">立即购买</div>
    </div>
  </x-border>
</template>
<script>
  export default {
    data () {
      return {
        comboList: [
          { name: 'A套餐', cpus: 1000, prick: 98, xiPrick: '0.098元/条', yanPrick: 150 },
          { name: 'B套餐', cpus: 5000, prick: 450, xiPrick: '0.09元/条', yanPrick: 750 },
          { name: 'C套餐', cpus: '1万', prick: 800, xiPrick: '0.08元/条', yanPrick: 1350 }
        ],
        rechargeIndex: 0
      }
    },
    mounted () { },
    methods: {
      taprecharge (index) {
        this.rechargeIndex = index
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./admin-sms-recharge.scss";
</style>
