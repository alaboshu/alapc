<template>
  <div class="tabs-item">
    <div v-for="(item,index) in viewModel" :key="index" :style="'width:'+100/count+'%;'+'display: inline-block;'">
      <div class="item" :style="{background:item.bgcolor}">
        <div>
          <div class="item-header">

          </div>
          <div class="item-body">
            <span :style="'color:' +item.color +';'">
              <x-count-up class="item-class" v-model="item.value" :style="'color:' +item.color +';'"></x-count-up>
            </span>
          </div>
          <div class="item-footer">
            <span :style="'color:' +item.color +';'">{{item.name}}</span>
          </div>
          <p class="item-tip">
            <i class="icon iconfont " :class="item.icon.name"></i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>  
  export default {
    data () {
      return {
        widgetModel: ''
      }
    },
    props: {
      viewModel: {},
      count: {
        default: 4
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.widgetModel = this.widget
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .tabs-item {
    margin: 8px;
    .el-row {
      box-sizing: border-box;
      .el-col-md-8 {
        width: 33.333%;
        color: red;
      }
    }
    .item {
      position: relative;
      margin: 8px;
      padding: 6px;
      height: 100px;
      border-radius: 4px;
      box-sizing: border-box;
      overflow: hidden;
    }
    .item a {
      color: #fff;
    }
    a {
      color: #fff;
    }
    .item-header {
      position: relative;
      p {
        color: #fff;
        margin: 0;
        font-size: 12px;
      }
      span {
        position: absolute;
        right: 0;
        top: 0;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 12px;
        background: rgba(255, 255, 255, 0.3);
      }
    }
    .item-body {
      height: 60px;
      border: 1px solid transparent;
      display: flex;
      align-items: center;
      span {
        font-size: 24px;
        color: #ffffff;
      }
      .item-class {
        font-size: 24px;
      }
    }
    .item-footer {
      padding-top: 8px;
      line-height: 20px;
      width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span {
        font-size: 10px;
        color: #fff;
      }
      p {
        color: #fff;
        margin: 0;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .item-tip {
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 80px;
      height: 80px;
      bottom: 10px;
      right: 10px;
      border: 2px solid #fff;
      border-radius: 100%;
      font-size: 50px;
      transform: rotate(-40deg);
      opacity: 0.1;
      i {
        font-size: 60px;
        padding-left: 5px;
        color: #fff;
      }
    }
  }
</style>
