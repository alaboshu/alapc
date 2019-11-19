<template>
  <div v-if="widgetModel">
    <x-border :border="widgetModel.border" :isDate="widgetModel.isDate" :reportType="widgetModel.reportTypeRadio">
      <div style="padding: 20px;">
        <count-report v-model="widgetModel" ref="countReport" v-if="widgetModel.reportTypeRadio == 'countReport'"></count-report>
        <total-count-report v-model="widgetModel" ref="countTotalReport" v-if="widgetModel.reportTypeRadio == 'countTotalReport'"></total-count-report>
        <sum-report v-model="widgetModel" ref="sumReport" v-if="widgetModel.reportTypeRadio == 'sumReport'"></sum-report>
      </div>
    </x-border>
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
