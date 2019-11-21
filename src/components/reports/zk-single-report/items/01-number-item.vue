<template>
  <div class="number-item">
    <div v-for="(item,index) in viewModel" :key="index" :style="'width:'+100/count+'%;'+'display: inline-block;'">
      <div class="item" :style="{background:item.bgcolor}">
        <div class="item-box" :style="'color:' +item.color +';'">
          <span>
            <x-count-up class="item-count" v-model="item.value"></x-count-up>
          </span>
          <i class="icon iconfont " :class="item.icon.name"></i>
        </div>
        <p class="item-more" :style="'color:' +item.color +';'">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        widgetModel: '',
        span: 6
      }
    },
    props: {
      viewModel: {},
      count: {
        default: 4
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .number-item {
    margin: 8px;
    font-size: 12px;
    .el-row {
      box-sizing: border-box;
      .el-col-md-6 {
        width: 25%;
      }
    }
    .item {
      margin: 8px;
      box-sizing: border-box;
      position: relative;
      color: #fff;
      border-radius: 3px;
    }
    .item-box {
      padding: 10px 30px;
      i {
        transition: all 0.3s linear;
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 65px;
        color: rgba(0, 0, 0, 0.15);
      }
    }
    .item-count {
      margin-bottom: 5px;
      font-size: 38px;
      white-space: nowrap;
      font-weight: 300;
      display: block;
      padding: 15px 0px;
    }
    .item-title {
      font-size: 15px;
    }
    .item-more {
      position: relative;
      text-align: left;
      padding: 3px 0;
      padding-left: 10px;
      color: #fff;
      color: rgba(61, 32, 32, 0.8);
      display: block;
      z-index: 10;
      font-size: 12px;
      letter-spacing: 2px;
      background: rgba(0, 0, 0, 0.1);
      text-decoration: none;
    }
  }
</style>
