<template>
  <div v-if="widgetModel">
    <count-report v-model="widgetModel" v-if="widgetModel.reportTypeRadio == 'countReport'"></count-report>
    <total-count-report v-model="widgetModel" v-if="widgetModel.reportTypeRadio == 'totalCountReport'"></total-count-report>
    <sum-report v-model="widgetModel" v-if="widgetModel.reportTypeRadio == 'sumReport'"></sum-report>
  </div>
</template>


<script>
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
        widgetModel: null
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
      }
    }
  }
</script>
