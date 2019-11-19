<template>
  <div class="count-report">
    <div class="">
      <ve-chart :grid="grid" :data="chartData" :extend="chartExtend" :colors="colors" :settings="chartSettings" v-if="dataModel.style!==2">
      </ve-chart>
    </div>
    <div class="">两个区块链</div>
  </div>
</template>

<script>
  import actions from './actions'
  export default {
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      dataModel: {}
    },
    data () {
      return {
        viewModel: '',
        chartData: {},
        chartExtend: {},
        colors: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        grid: {
          show: true,
          height: 320,
          backgroundColor: '#fff',
          borderColor: '#fff'
        },
        chartSettings: {
          type: 'line'
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        console.info('bbbbbbb', this.dataModel.reportType)
        this.chartSettings.type = actions.chartType(this.dataModel.reportType)
        var para = {
          ...this.dataModel
        }
        if (this.dataModel.style !== 2) {
          var response = await this.$api.httpPost('/api/Report/GetCountReport', para)
          if (response.status === 1) {
            console.info('数据报表', response)
            this.chartData = response.result
            this.chartSettings.type = response.result.type
          } else {
            this.$alert('配置出错，数据请求不成功，请重新配置')
          }
        }
      }
    }
  }
</script>
