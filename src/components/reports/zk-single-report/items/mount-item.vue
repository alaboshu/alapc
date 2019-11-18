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
          <form-item :widget="item" type="mount-item" :widgetModel="widgetModel"></form-item>
        </router-link>
      </div>
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
  @import "./style.scss";
</style>
