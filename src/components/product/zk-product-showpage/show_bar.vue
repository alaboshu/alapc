<template>
  <div class="side-navigation">
    <div class="side_top">
      <div class="top_left"></div>
      <div class="top_middle"></div>

    </div>
  </div>
  <!-- <ul class="side-navigation_ul">
      <li>
        <router-link @click="onBlock(1)">
          <i class="guige_i"></i>
          <i class="guige_i2" :class="{'xian':cout==1}"></i>
          <span class="guige_span">商品详情</span>
        </router-link>
      </li>
      <li>
        <router-link @click="onBlock(2)">
          <i class="guige_i"></i>
          <i class="guige_i2" :class="{'xian':cout==2}"></i>
          <span class="guige_span">规格参数</span>
        </router-link>
      </li>
      <li>
        <router-link @click="onBlock(3)">
          <i class="guige_i"></i>
          <i class="guige_i2" :class="{'xian':cout==3}"></i>
          <span class="guige_span">累计评价</span>
        </router-link>
      </li>
    </ul> -->
  <!-- </div> -->
</template>
<script>
  export default {
    data () {
      return {
        cout: 1
      }
    },
    props: {
      productList: {},
      scrollTop: {}
    },
    async onShow () {
    },
    mounted () {
    },
    methods: {
      onBlock (index) {
        this.cout = index
        this.$emit('control', index)
      },
      zizujian (index) {
        this.cout = index
      }
    }
  }
</script>
<style  lang="scss" scoped>
  @import "~_style/theme.scss";
  .side-navigation {
  }
</style>

