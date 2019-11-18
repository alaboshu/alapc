<template>
  <div class="general-item">
    <div>
      <div v-for="(item,index) in viewModel" :key="index" :style="'width:'+100/count+'%;'+'display: inline-block;'">
        <div>
          <div class="item" :class="[{'item--easy':discount}]">
            <div class="general-item-icon" :style="{color:item.color}">
              <i class="icon iconfont" :class="item.icon.name"></i>
            </div>
            <div class="item-info">
              <span>{{item.name}}</span>
              <div class="count" :style="{color:item.color}">{{item.count}}</div>
            </div>
          </div>
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
        span: 4,
        color: 'rgb(63, 161, 255)',
        discount: false
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
  @import "./style.scss";
</style>

