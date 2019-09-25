<template>
  <div v-if="widget">
    <div v-if="widget.autoReportChart.type===0">
      <ve-line :data="widget.autoReportChart"></ve-line>
    </div>
    <div v-if="widget.autoReportChart.type===1">
      <ve-histogram :data="widget.autoReportChart"></ve-histogram>
    </div>
    <div v-if="widget.autoReportChart.type===2">
      <ve-bar :data="widget.autoReportChart"></ve-bar>
    </div>
    <div v-if="widget.autoReportChart.type===3">
      <ve-pie :data="widget.autoReportChart"></ve-pie>
    </div>
    <div v-if="widget.autoReportChart.type===4">
      <ve-ring :data="widget.autoReportChart"></ve-ring>
    </div>
    <div v-if="widget.autoReportChart.type===5">
      <ve-waterfall :data="widget.autoReportChart"></ve-waterfall>
    </div>
    <div v-if="widget.autoReportChart.type===6">
      <ve-funnel :data="widget.autoReportChart"></ve-funnel>
    </div>
    <div v-if="widget.autoReportChart.type===7">
      <ve-radar :data="widget.autoReportChart"></ve-radar>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        async: false,
        data: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
      }
    }
  }
</script>
