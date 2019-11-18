<template>
  <div class="zk-single-report" v-if="async">
    <number-item v-if="widget.value.styleItem===1" :widget="widget.value.reportValues" :count="widget.value.count"></number-item>
    <tabs-item v-if="widget.value.styleItem===2" :widget="widget.value.reportValues" :count="widget.value.count"></tabs-item>
    <amount-item v-if="widget.value.styleItem===3" :widget="widget.value.reportValues" :count="widget.value.count"></amount-item>
    <mount-item v-if="widget.value.styleItem===4" :widget="widget.value.reportValues" :count="widget.value.count"></mount-item>
    <general-item v-if="widget.value.styleItem===5" :widget="widget.value.reportValues" :count="widget.value.count"></general-item>
    <growing-item v-if="widget.value.styleItem===6" :widget="widget.value.reportValues" :count="widget.value.count"></growing-item>
    <introduce-item v-if="widget.value.styleItem===7" :widget="widget.value.reportValues" :count="widget.value.count"></introduce-item>
    <member-item v-if="widget.value.styleItem===8" :widget="widget.value.reportValues" :count="widget.value.count"></member-item>
    <ratio-item v-if="widget.value.styleItem===9" :widget="widget" :count="widget.value.count"></ratio-item>
    <states-item v-if="widget.value.styleItem===10" :widget="widget.value.reportValues" :count="widget.value.count"></states-item>
    <total-item v-if="widget.value.styleItem===11" :widget="widget.value.reportValues" :count="widget.value.count"></total-item>
    <omit-item v-if="widget.value.styleItem===12" :widget="widget.value.reportValues" :count="widget.value.count"></omit-item>
  </div>
</template>

<script>

  import numberItem from './items/number-item.vue'
  import tabsItem from './items/tabs-item.vue'
  import amountItem from './items/amount-item.vue'
  import mountItem from './items/mount-item.vue'
  import generalItem from './items/general-item.vue'
  import growingItem from './items/growing-item.vue'
  import introduceItem from './items/introduce-item.vue'
  import memberItem from './items/member-item.vue'
  import ratioItem from './items/ratio-item.vue'
  import statesItem from './items/states-item.vue'
  import totalItem from './items/total-item.vue'
  import omitItem from './items/omit-item.vue'
  // import './var.scss'

  export default {

    components: {
      numberItem,
      tabsItem,
      amountItem,
      mountItem,
      generalItem,
      growingItem,
      introduceItem,
      memberItem,
      ratioItem,
      statesItem,
      totalItem,
      omitItem
    },
    data () {
      return {
        widgetModel: {},
        async: false,
        viewModel: '',
        styleType: ''
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
        this.viewModel = this.widget.value.reportValues
        if (this.widget && this.widget.value && this.widget.value.dataReport) {
          var dataReport = this.widget.value.dataReport
          para.entityType = dataReport.entityType
          para.field = dataReport.field
          para.style = dataReport.style
          para.condition = dataReport.condition
        }
        // var response = await this.$api.httpPost('/api/Report/GetSingleReport', this.widget.value.singleReportForm[0].dataCouse)
        this.async = true
      }
    }
  }
</script>
