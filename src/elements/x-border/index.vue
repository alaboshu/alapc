
<template>
  <div class="x-border" v-if="async">
    <div class="widget-header" :style="{background:backGroundColor}">
      <span class="more"></span>
      <h3 class="widget-header-title" :style="{color:fontColor}">
        <x-icon class="iconver" :name="viewModel.icon" :color="fontColor"></x-icon>
        {{viewModel.title}}
        <div class="widget-header-desc">{{viewModel.description}}</div>
      </h3>
      <div class="header-right">
        <div v-if="false">
          <el-tabs v-model="activeName" @tab-click="handleClick(null)">
            <el-tab-pane v-for="(item,index) in tabsList" :key="index" :name="item.key">
              <span slot="label">
                <span v-if="item.key !== 'appoint'"> {{item.name}}</span>
                <el-popover placement="bottom-end" v-else trigger="click">
                  <el-date-picker @input="handleClick" :picker-options="pickerOptions" v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span slot="reference">{{item.name}}</span>
                </el-popover>
              </span>
            </el-tab-pane>
          </el-tabs>
        </div>
        <slot v-else name="headerRight"></slot>
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
  import json from './index.json'
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
        async: false,
        tabsList: json.links
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
