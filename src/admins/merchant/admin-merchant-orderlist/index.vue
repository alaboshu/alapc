<template>
  <x-border title="本店出品-订单管理" v-loading="fullscreenLoading">
    <x-table :widgetData="widgetData" ref="xtable" :isTemplate="true" :showTable="false">
      <template slot-scope="user">
        <div class="order_list" v-for="(item,itemIndex) in user.data.result.result" :key="itemIndex">
          <div class="order_list_top">
            <div class="order_list_left">
              <div>
                <span>订单编号:</span>
                <router-link tag="span" style="cursor: pointer;" :to="user.data.tableActions[0].url+'?id='+item.id">{{item.serial}}</router-link>
                <span> {{item.createTime}}</span>
              </div>
            </div>
            <div class="order_list_top_center">{{item.merchantStoreName}}</div>
            <div class="order_list_top_right">
            </div>
          </div>
          <div class="order_list_cont" v-for="(cont,contIndex) in item.products" :key="contIndex">
            <div class="order_list_cont_left">
              <router-link tag="img" class="img" style="cursor: pointer;" :src="cont.thumbnailUrl" :to="user.data.tableActions[0].url+'?id='+item.id"></router-link>
              <div class="order_cont">
                <p>{{cont.productName}}</p>
                <p>{{cont.skuName}}</p>
              </div>
            </div>
            <div class="order_list_cont_center">
              <span>{{cont.price.toFixed(2)}}</span>X{{cont.count}}
            </div>
            <div class="order_list_cont_right" v-if="contIndex===0">
              <div v-if="false">
                <p>
                  <i class="iconfont zk-debt-me"></i>
                  <span></span>
                </p>
                <p></p>
              </div>
              <div class="price">
                <p>￥{{item.paymentAmount}}元 </p>
              </div>
              <div class="order">
                <p class="button">{{$base.getEnumText('OrderStatus', item.merchantOrderStatus)}}</p>
                <p>
                  <router-link class="iconfont zk-userfeedback" tag="i" :to="user.data.tableActions[0].url+'?id='+item.id">订单详情</router-link>
                </p>
                <p v-if="false"><i class="iconfont zk-withdrawal"></i>分润详情</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </x-table>
  </x-border>
</template>


<script>
  export default {
    data () {
      return {
        viewModel: null,
        checked: false,
        fullscreenLoading: false
      }
    },
    props: {
      widgetData: {}
    },
    components: {
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.fullscreenLoading = true
        setTimeout(() => {
          this.fullscreenLoading = false
        }, 500)
      },
      convertTo (type, viewModel) {
        return viewModel
      },
      getPath () {
        this.init()
      }
    },
    watch: {
      '$route': 'getPath'
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>
