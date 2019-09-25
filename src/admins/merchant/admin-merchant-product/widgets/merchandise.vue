<template>
  <div class="order-merchandise" v-if="viewModel">
    <div class="merchandise_top" v-for="(item, index) in viewModel.products" :key="index">
      <div class="picture_left">
        <img :src="item.thumbnailUrl" />
      </div>
      <div class="conter-text">
        <div class="conter-text_list">
          <p class="text_p1">{{item.productName}}</p>
          <p class="text_p2">{{item.skuName}}<span>{{item.price.toFixed(2)}}</span></p>
        </div>
        <div class="conter-text_list">
          <p class="text_p1 text_size">{{item.price}}</p>
          <p class="text_p2 conter_number">x{{item.count}}</p>
        </div>
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
    },
    mounted () {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./styles/merchandise.scss";
</style>
