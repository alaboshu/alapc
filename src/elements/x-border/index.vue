
<template>
  <div class="x-border" v-if="async">
    <div class="widget-header" :style="{background:backGroundColor}">
      <span class="more"></span>
      <h3 class="widget-header-title" :style="{color:fontColor}">
        <x-icon class="iconver" :name="viewModel.icon" :color="fontColor"></x-icon> {{viewModel.title}}
        <div class="widget-header-desc">{{viewModel.description}}</div>
      </h3>
      <div class="header-right">
        <slot name="headerRight"></slot>
      </div>
    </div>
    <div class="widget-body">
      <slot></slot>
    </div>
    <div class="widget-footer">
      <span></span>
    </div>
  </div>
</template>
<script>
  import actions from './actions'
  export default {
    data () {
      return {
        viewModel: {
          title: '',
          icon: '',
          description: ''
        },
        backGroundColor: '#ffffff',
        fontColor: '#575962',
        async: false
      }
    },
    props: {
      title: {
        default: null
      },
      desc: {
        default: null
      },
      type: {
        type: String,
        validator: function (t) {
          return t === 'metal' || t === 'brand' || t === 'primary' || t === 'success' || t === 'warning' || t === 'focus' || t === 'accent' || t === 'danger' || t === 'light'
        },
        defalut: 'metal'
      },
      icon: {
        // 图标名称
        default: null
      },
      // 图标对象
      border: {}
    },
    mounted () {
      this.init(this.border)
    },
    methods: {
      async init (border) {
        actions.init(this, border)
        this.async = true
      },
      handleClick (ev) {
        actions.handleClick(this, ev)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "~_style_all/theme.scss";
  @import "./style.scss";
</style>
