<template>
  <div class="number-item">
    <div v-for="(item,index) in widgetModel" :key="index" :style="'width:'+100/count+'%;'+'display: inline-block;'">
      <!-- <div class="item" :style="{background:item.color}">
        <div class="item-box" :style="'color:'+item.fontColor+';'">
          <span class="item-count">{{item.value.condition.value}}</span>
          <span class="item-title">{{item.name}}</span>
          <i class="icon iconfont " :class="item.icon.name"></i>
        </div>
        <router-link to="">
          <p class="item-more">更多<i class="el-icon-arrow-right"></i></p>
        </router-link>
      </div> -->
      <form-item :widget="item" type="number-item" :widgetModel="widgetModel"></form-item>
    </div>
  </div>
</template>
<script>
  import formItem from './widget/form-item'
  export default {
    components: {
      formItem
    },
    data () {
      return {
        widgetModel: '',
        span: 6
      }
    },
    props: {
      widget: {},
      count: {
        default: 4
      }
    },
    mounted () {
      console.info('7')
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
