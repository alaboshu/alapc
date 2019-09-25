<template>
  <div class="number-item">
    <el-row span="24">
      <el-col :md="span" :xs="24" :sm="12" v-for="(item,index) in widgetModel" :key="index">
        <div class="item" :style="{background:item.color}">
          <div class="item-box">
            <span class="item-count">{{item.value}}</span>
            <span class="item-title">{{item.name}}</span>
            <i class="icon iconfont" :class="item.icon"></i>
          </div>
          <router-link to="">
            <p class="item-more">更多<i class="el-icon-arrow-right"></i></p>
          </router-link>
        </div>
      </el-col>
    </el-row>
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
      widget: {}
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
  @import "./style.scss";
</style>
