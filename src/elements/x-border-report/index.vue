<template>
  <div class="zk-border-date">
    <div class="widget-header" :style="{background:backGroundColor}" v-if="headType">
      <span class="more"></span>
      <h3 class="widget-header-title" :style="{color:fontColor}">
        <i class="iconver iconfont glyph-icon" :class="Icon" v-if="iconShow" :style="{color:fontColor}"></i>
        <x-icon class="iconver" :src="iconType.path" v-else></x-icon>
        {{title}}
      </h3>
      <div class="header-right">
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
  import active from './active'
  import timer from './timer'
  export default {
    provide () {
      return {
        handleClick: this.handleClick
      }
    },
    data () {
      return {
        Icon: null,
        backGroundColor: '#ffffff',
        fontColor: '#575962',
        iconShow: true,
        tabsList: json.links,
        activeName: 'mounth',
        pickerOptions: active.shortcut(),
        value1: '',
        async: false
      }
    },
    props: {
      title: {},
      color: {},
      icon: {
        default: null
      },
      headType: {
        default: true
      },
      iconType: {
        default: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        active.init(this)
        this.inshow = true
        // this.handleClick(null)
      },
      handleClick (ev) {
        var date = new Date()
        var para = {}
        if (this.activeName !== 'appoint') {
          if (this.activeName === 'toDay') {
            para.startTime = timer.timeFormat(date)
            para.endTime = timer.timeFormat(date)
          } else if (this.activeName === 'yesterDay') {
            para.startTime = timer.timeFormat(new Date(date.getTime() - 24 * 60 * 60 * 1000))
            para.endTime = timer.timeFormat(new Date(date.getTime() - 24 * 60 * 60 * 1000))
          } else if (this.activeName === 'event') {
            para.startTime = ''
            para.endTime = ''
          } else {
            para.endTime = timer.timeFormat(date)
            para.startTime = timer.getTime(date, this.activeName)
          }
        }
        // 自定义时间
        if (this.activeName === 'appoint' && ev !== null) {
          para.startTime = timer.timeFormat(ev[0])
          para.endTime = timer.timeFormat(ev[1])
        }
        // 获取slot下组件实例
        var data = this.$slots.default[0].context
        data.activeName = this.activeName
        data.obtainTime = para
        if (para.startTime !== undefined) {
          data.inshow = false
          data.loading = true
          data.init()
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "~_style_all/theme.scss";
  @import "./var.scss";
</style>
