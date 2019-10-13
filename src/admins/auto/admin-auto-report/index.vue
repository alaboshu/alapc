<template>
  <div v-if="async">
    <div v-for="(widget,widgetIndex) in viewModel" :key="widgetIndex" class="auto-report_list">
      <div v-if="widget.autoReportChart" class="report_list-box">
        <x-border :title="widget.name" type="success">
          <zk-report-chart :widget="widget"></zk-report-chart>
        </x-border>
      </div>
      <div v-if="widget.autoReprotData" class="report_list-box">
        <x-border :title="widget.name" color="info">
          <zk-report-data :widget="widget"></zk-report-data>
        </x-border>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      widgetData: {}
    },
    data () {
      return {
        async: false,
        viewModel: null,
        title: '数据编辑'
      }
    },

    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.async = false
        // if (this.viewModel === null) {
        var type = this.$crud.getType()
        var para = {
          type: type
        }
        var response = await this.$api.httpGet('/Api/auto/report', para)
        if (response.status === 1) {
          this.viewModel = response.result
          this.title = this.viewModel.name
          this.async = true
        } else {
          this.$alert(response.message, '类型输入错误', {
            confirmButtonText: '确定'
          })
        }
        // }
      },
      getPath () {
        this.init()
      }
    },
    watch: {
      'widgetData': 'getPath'
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .auto-report_list {
    .report_list-box {
      margin-bottom: 20px;
    }
    &:last-of-type {
      .report_list-box {
        margin-bottom: 0px;
      }
    }
  }
</style>
