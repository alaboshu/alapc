<template>
  <div class="order-merchandise" v-if="viewModel">
    <div class="merchandise_top" v-for="(item, index) in viewModel.productSkuItems" :key="index">
      <div class="picture_left">
        <img :src="item.thumbnailUrl" />
      </div>
      <div class="conter-text">
        <div class="conter-text_list">
          <p class="text_p1">{{item.name}}</p>
          <p class="text_p2">{{item.propertyValueDesc}}<span>{{item.displayPrice}}</span></p>
          <!-- <p class="text_p3">s2B商城</p> -->
        </div>
        <div class="conter-text_list">
          <p class="text_p1 text_size">{{item.price}}</p>
          <p class="text_p2 conter_number">x{{item.buyCount}}</p>
        </div>
        <!-- <div class="conter-text_list">
          <p class="text_p1 text_size text_black">0</p>
          <p class="text_p2 conter_number">已发货</p>
        </div> -->
      </div>
    </div>
    <div class="merchandise_amount">
      <AmountList :viewModel="viewModel"></AmountList>
    </div>
  </div>
</template>
<script>
  import AmountList from './amount-list'
  export default {
    props: {
      viewModel: {}
    },
    components: {
      AmountList
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../styles/merchandise.scss";
</style>
