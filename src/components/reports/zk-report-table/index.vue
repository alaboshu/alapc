<template>
  <div v-if="widgetModel" class="zk-report-table">
    <x-border :border="widgetModel.border" :isDate="widgetModel.isDate" :reportType="widgetModel.reportTypeRadio">
      <div style="padding: 20px;">
        <count-report v-model="widgetModel" ref="countReport" v-if="widgetModel.reportTypeRadio == 'countReport'"></count-report>
        <total-count-report v-model="widgetModel" ref="countTotalReport" v-if="widgetModel.reportTypeRadio == 'countTotalReport'"></total-count-report>
        <sum-report v-model="widgetModel" ref="sumReport" v-if="widgetModel.reportTypeRadio == 'sumReport'"></sum-report>
      </div>
      <div slot="headerRight" v-if="tabsList">
        <el-tabs v-model="activeName">
          <el-tab-pane v-for="(item,index) in tabsList" :key="index" :name="item.key">
            <span slot="label">
              <span v-if="item.key !== 'customer'" @click="handleClick(item)" style="height: 100%; display:inline-block"> {{item.name}}</span>
              <el-popover placement="bottom-end" v-else trigger="click">
                <el-date-picker @input="handleClick" :clearable="false" :picker-options="pickerOptions" v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
                <span slot="reference" style="height: 100%; display:inline-block">{{item.name}}</span>
              </el-popover>
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>
    </x-border>
  </div>
</template>


<script>
  import json from './index.json'
  import actions from './actions'
  import countReport from './styles/count-report'
  import totalCountReport from './styles/total-count-report'
  import sumReport from './styles/sum-report'
  export default {
    components: {
      countReport,
      totalCountReport,
      sumReport
    },
    props: {
      widget: {}
    },
    data () {
      return {
        viewModel: null,
        widgetModel: null,
        tabsList: [],
        links: json,
        pickerOptions: actions.shortcut(),
        activeName: 'noLimit',
        value1: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.widget && this.widget.value) {
          this.widgetModel = this.widget.value.countReportForm
        }
        console.info(this.widgetModel, json)
        if (this.widgetModel.reportTypeRadio === 'sumReport') {
          this.tabsList = this.links
        } else {
          this.tabsList = this.links.filter(r => r.show)
        }
      },
      handleClick (ev) {
        actions.handleClick(this, ev)
      }
    }
  }
</script>

<style lang="scss">
  @import "./var.scss";
</style>
