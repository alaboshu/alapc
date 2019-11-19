<template>
  <div class="tabs-item">
    <div v-for="(item,index) in viewModel" :key="index" :style="'width:'+100/count+'%;'+'display: inline-block;'">
      <div class="item" :style="{background:item.bgcolor}">
        <div>
          <div class="item-header">
            <p>{{getDate(item.count)}}</p>
          </div>
          <div class="item-body">
            <span>{{item.count}}</span>
          </div>
          <div class="item-footer">
            <span>{{item.count}}</span>
            <p>{{item.intro}}</p>
          </div>
          <p class="item-tip">
            <i class="icon iconfont" :class="item.icon"></i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>  
  import minx from './minx/index'
  export default {
    mixins: [minx],
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
    .el-row {
      box-sizing: border-box;
      .el-col-md-8 {
        width: 33.333%;
        color: red;
      }
    }
    .item {
      position: relative;
      margin: 15px;
      padding: 12px;
      height: 160px;
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
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 80px;
      height: 80px;
      bottom: 10px;
      right: 10px;
      border: 2px solid #fff;
      border-radius: 100%;
      font-size: 48px;
      transform: rotate(-40deg);
      opacity: 0.1;
      i {
        font-size: 38px;
        color: #fff;
      }
    }
  }
</style>
