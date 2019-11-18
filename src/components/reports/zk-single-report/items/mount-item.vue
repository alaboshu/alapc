<template>
  <div class="mount-item">
    <div>
      <div class="mount-item_list" v-for="(item,index) in viewModel" :key="index" :style="'width:'+100/count+'%;'+'display: inline-block;'">
        <router-link to="item.href">
          <div class="item">
            <div class="item-icon" :style="{background:item.bgcolor}">
              <i class="icon iconfont" :class="item.icon"></i>
            </div>
            <div class="item-info">
              <div class="item-title" :style="{color:item.color}">{{item.name}}</div>
              <span class="item-count">{{item.count}}</span>
            </div>
          </div>
        </router-link>
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
  @import "./style.scss";
</style>
