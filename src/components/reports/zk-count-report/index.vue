<template>
  <div class="zk-count-report" v-if="async">
    <zk-border-date :title="viewModel.reportTitle" :iconType="viewModel.reportIcon" :color="viewModel.themeColor">
      <div class="zk-count-report-cont" v-loading="loading">
        <ve-chart :grid="grid" :data="chartData" v-if="inshow" :extend="chartExtend" :colors="colors" :settings="chartSettings">
        </ve-chart>
        <div class="zk-count-report-foot" v-html="viewModel.help"></div>
      </div>
    </zk-border-date>
  </div>
</template>

<script>

  import './var.scss'
  import timer from '../zk-border-date/timer'
  export default {
    data () {
      return {
        activeName: 'mounth',
        chartData: {},
        colors: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        chartSettings: {
          type: 'line'
        },
        chartExtend: {},
        grid: {
          show: true,
          height: 320,
          backgroundColor: '#fff',
          borderColor: '#fff'
        },
        viewModel: {},
        async: false,
        obtainTime: null,
        inshow: false,
        loading: true
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var date = new Date()
        var para = {
          condition: {}
        }
        if (this.widget && this.widget.value) {
          this.viewModel = this.widget.value
          this.chartSettings.type = this.viewModel.reportChartType
          this.grid.backgroundColor = this.viewModel.reportBgColor
          if (this.widget.value.dataReport) {
            var widgetValue = this.widget.value.dataReport
            para.field = widgetValue.field
            para.fields = widgetValue.fields
            para.entityType = widgetValue.entityType
            para.condition = widgetValue.condition
            para.condition.endTime = timer.timeFormat(date)
            para.condition.startTime = timer.getTime(date, this.activeName)
          }
        }
        if (this.obtainTime) {
          para.condition.startTime = this.obtainTime.startTime
          para.condition.endTime = this.obtainTime.endTime
        }
        if (this.activeName === 'event') {
          delete para.condition.startTime
          delete para.condition.endTime
        }
        var res = await this.$api.httpPost('/api/Report/GetCountReport', para)
        if (res.status === 1) {
          if (res.result !== []) {
            this.chartData.columns = res.result[0].autoReportChart.columns
            this.chartData.rows = res.result[0].autoReportChart.rows
          }
          if (this.chartSettings.type === 'histogram') {
            if (this.chartData.rows.length > 10) {
              this.chartExtend = {}
            } else {
              this.chartExtend = {
                series (v) {
                  v.forEach(i => {
                    i.barWidth = 25
                  })
                  return v
                }
              }
            }
          }
        }
        this.inshow = true
        this.async = true
        setTimeout(() => {
          this.loading = false
        }, 300)
      }
    }
  }
</script>
