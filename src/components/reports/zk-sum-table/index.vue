<template>
  <div class="zk-sum-table" v-if="async">
    <zk-border-date :title="viewModel.reportTitle" :iconType="viewModel.reportIcon" :color="viewModel.themeColor">
      <div class="zk-sum-table-cont">
        <el-table ref="singleTable" :data="tableData.rows" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
          <el-table-column type="index" width="50" fixed>
          </el-table-column>
          <div v-for="(item, index) in tableData.columns" :key="index">
            <el-table-column :property="item.type" :label="item.name" :prop="item.type" width="180">
            </el-table-column>
          </div>
        </el-table>
        <div class="zk-sum-table-foot" v-html="widget.value.help"></div>
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
        async: false,
        obtainTime: '',
        tableData: '',
        currentRow: null
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
        var para = {}
        if (this.widget && this.widget.value) {
          this.viewModel = this.widget.value
          if (this.widget.value.dataReport) {
            var widgetValue = this.widget.value.dataReport
            para.field = widgetValue.field
            para.entityType = widgetValue.entityType
            para.condition = widgetValue.condition
          }
        }
        // if (this.obtainTime) {
        //   para.condition.startTime = this.obtainTime.startTime
        //   para.condition.endTime = this.obtainTime.endTime
        // }
        // if (this.activeName === 'event') {
        //   delete para.condition.startTime
        //   delete para.condition.endTime
        // }
        var date = new Date()
        var data = {
          condition: {
            field: '',
            startTime: timer.timeFormat(date),
            endTime: timer.timeFormat(date)
          },
          entityType: 'Bill',
          field: 'Type',
          PageSize: 15,
          PageIndex: 1
        }
        if (this.obtainTime) {
          data.condition.startTime = this.obtainTime.startTime
          data.condition.endTime = this.obtainTime.endTime
        }
        var response = await this.$api.httpPost('/api/Report/GetCountTable', data)
        this.tableData = response.result[0].autoReportChart
        this.async = true
      },
      handleCurrentChange (val) {
        this.currentRow = val
      }
    }
  }
</script>
