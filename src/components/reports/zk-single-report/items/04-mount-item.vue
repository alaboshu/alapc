<template>
  <div class="mount-item">
    <div class="mount-item_list" v-for="(item,index) in viewModel" :key="index" :style="'width:200px;display: inline-block;'">
      <div class="item">
        <div class="item-icon" :style="{background:item.bgcolor}">
          <i class="icon iconfont" :class="item.icon.name"></i>
        </div>
        <div class="item-info">
          <span class="item-count" :style="{color:item.bgcolor}">{{item.value}}</span>
          <div class="item-title">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        widgetModel: '',
        span: 8
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
  .mount-item {
    font-size: 12px;
    margin: 10px;
    padding-bottom: 8px;
    .el-row {
      box-sizing: border-box;
    }
    .item {
      padding: 0px;
      margin: 5px;
      height: 60px;
      font-size: 12px;
      color: #666;
      display: flex;
      align-items: center;
      flex: 1;
      overflow: hidden;
      background-color: #f7f8fa;
      .item-icon {
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
      }
      i {
        font-family: element-icons !important;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        vertical-align: baseline;
        display: inline-block;
        font-size: 24px;
        color: #fff;
        vertical-align: -2px;
      }
    }

    .item-info {
      flex: 1;
      text-align: center;
      div,
      span {
        text-align: center;
      }
    }

    .item-title {
      color: #909399;
      font-size: 1rem;
      margin-top: 12px;
    }

    .item-count {
      font-size: 24px;
      font-weight: bold;
      color: #999999;
    }
  }
</style>
