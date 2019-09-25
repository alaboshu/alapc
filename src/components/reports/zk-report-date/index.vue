<template>
  <div class="zk-report-date" v-if="async">
    <zk-border-date :title="viewModel.reportTitle" :iconType="viewModel.reportIcon" :color="viewModel.themeColor">
      <div class="zk-report-date-cont" v-if="inshow">
        <div class="zk-report-date-left list">
          <ve-chart :grid="grid" :data="chartData" :colors="colors" :settings="chartSettings">
            <div class="data-empty" v-if="this.chartData.rows.length < 1">
              <img src="../../../../static/img/nodata.jpg" alt="">
            </div>
          </ve-chart>
        </div>
        <div class="zk-report-date-right list">
          fdsjlksaf
        </div>
      </div>
    </zk-border-date>
  </div>
</template>




<script>

  export default {

    data () {
      return {
        activeName: 7,
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '9月1日', '访问用户': 1393, '下单用户': 1093, '下单率': 200 },
            { '日期': '9月2日', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '9月3日', '访问用户': 2923, '下单用户': 2623, '下单率': 10 },
            { '日期': '9月4日', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '9月5日', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '9月6日', '访问用户': 4593, '下单用户': 4293, '下单率': 777 },
            { '日期': '9月7日', '访问用户': 6563, '下单用户': 2413, '下单率': 55 },
            { '日期': '9月8日', '访问用户': 4593, '下单用户': 4293, '下单率': 263 },
            { '日期': '9月9日', '访问用户': 4593, '下单用户': 4293, '下单率': 4023 }
          ]
        },
        colors: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        chartSettings: {
          type: 'pie'
        },
        grid: {
          show: true,
          height: 320,
          backgroundColor: '#fff',
          borderColor: '#fff'
        },
        viewModel: {},
        async: false,
        obtainTime: null,
        inshow: false
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
        if (this.widget && this.widget.value) {
          this.viewModel = this.widget.value
          this.chartSettings.type = this.viewModel.reportChartType
          this.grid.backgroundColor = this.viewModel.reportBgColor
        }
        var para = {
          Fields: 'TotalAmount',
          type: 'order',
          startTime: this.getNowTime(),
          endTime: this.getTimeBefore()
        }
        if (this.obtainTime) {
          para.startTime = this.obtainTime.startTime
          para.endTime = this.obtainTime.endTime
        }
        // var response = await this.$api.httpGet('Api/Report/GetSumReport', para, true)
        // if (response.status === 1) {
        //   this.chartData.columns = response.result[0].autoReportChart.columns
        //   this.chartData.rows = response.result[0].autoReportChart.rows
        // }
        this.inshow = true
        this.async = true
      },
      getNowTime () {
        // 获取当前时间
        var nowdate = new Date()
        var y = nowdate.getFullYear()
        var m = nowdate.getMonth() + 1
        var d = nowdate.getDate()
        var formatnowdate = y + '-' + m + '-' + d
        return formatnowdate
      },
      getTimeBefore () {
        // 默认获取一周前
        if (this.activeName) {
          var date = new Date()
          var oneweekdate = new Date(date - this.activeName * 24 * 3600 * 1000)
          var y = oneweekdate.getFullYear()
          var m = oneweekdate.getMonth() + 1
          var d = oneweekdate.getDate()
          var formatwdate = y + '-' + m + '-' + d
          return formatwdate
        }
      }
    },
    watch: {
      activeName () {
        this.inshow = false
        this.$nextTick(() => {
          this.inshow = true
        })
      }
    }
  }
</script>



<style lang="scss">
  @import "./var.scss";
</style>
