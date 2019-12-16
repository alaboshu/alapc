<template>
  <div class="showRight">
    <ul class="showRightTop">
      <li :class="{active:navActive===1}" @click="navActive=1">商品详情</li>
      <!-- <li  :class="{active:navActive===2}" @click="navActive=2">累计评价 <span>12</span></li> -->
      <li :class="{active:navActive===3}" @click="navActive=3">本店同类产品</li>
    </ul>
    <div>
      <Detail :productView="productView" v-show="navActive===1"></Detail>
      <!-- <Evaluate  v-show="navActive===2"></Evaluate> -->
      <List :productView="productView" v-show="navActive===3"></List>
    </div>
  </div>
</template>

<script>
  import Detail from './show_right_detail'
  //   import Evaluate from './show_evaluate'
  import List from './show_list'
  export default {
    components: {
      Detail,
      //   Evaluate,
      List
    },
    data () {
      return {
        navActive: 1,
        listContent: []
      }
    },
    props: {
      productView: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.listContent = this.productView
      }
    }

  }
</script>




<style lang="scss" scoped>
  @import "~_style/theme.scss";
  .showRight {
    width: 100%;
    .showRightTop {
      height: 42px;
      display: flex;
      background-color: #f5f5f5;
      border-bottom: 1px solid #e4393c;
      display: flex;
      align-items: center;
      li {
        display: inline-block;
        height: 42px;
        line-height: 42px;
        font-size: 14px;
        padding: 0px 25px;
        font-family: "microsoft yahei";
        cursor: pointer;
      }
      .active {
        background-color: #e4393c;
        color: #ffffff;
      }
    }
  }
</style>

