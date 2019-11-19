<template>
  <div class="count-report" v-if="async">
    <div class="" v-if="dataModel.style !== 2">
      <ve-chart :grid="grid" :data="chartData" :extend="chartExtend" :colors="colors" :settings="chartSettings" v-if="dataModel.style!==2">
      </ve-chart>
    </div>
    <div class="" v-if="dataModel.style !== 1">
      <el-table :data="tableData.rows" style="width: 100%" :row-class-name="tableRowClassName">
        <div class="table" v-for="(item, index) in tableData.columns" :key="index">
          <el-table-column :prop="item" :label="item">
          </el-table-column>
        </div>
      </el-table>
      <div class="pagination-list">
        <el-pagination @current-change="pagesChange" layout="prev, pager, next" :page-size="15" :current-page="currentPage" :total="tableData.totalCount">
        </el-pagination>
      </div>
    </div>
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
        tableData: {},
        colors: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        grid: {
          show: true,
          height: 320,
          backgroundColor: '#fff',
          borderColor: '#fff'
        },
        chartSettings: {
          type: 'line'
        },
        currentPage: 1,
        reportApi: '/api/Report/GetCountReport',
        tableApi: '/api/Report/GetCountTable',
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        console.info('触发 init ')
        if (this.dataModel.style !== 2) {
          actions.getReport(this, this.dataModel)
        }
        if (this.dataModel.style !== 1) {
          actions.getTable(this, this.dataModel)
        }
        this.chartSettings.type = actions.chartType(this.dataModel.reportType)
        this.async = true
      },
      // 设置颜色
      tableRowClassName ({ row, rowIndex }) {
        if ((rowIndex % 2) === 0) {
          return ''
        } else {
          return 'success-row'
        }
      },
      async pagesChange (ev) {
        actions.pageChange(this, ev)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .pagination-list {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
