<template>
  <div class="zk-single-report" v-if="async">
    <number-item v-if="widget.value.styleItem==1" :viewModel="viewModel" :count="widget.value.count"></number-item>
    <tabs-item v-if="widget.value.styleItem==2" :viewModel="viewModel" :count="widget.value.count"></tabs-item>
    <amount-item v-if="widget.value.styleItem==3" :viewModel="viewModel" :count="widget.value.count"></amount-item>
    <mount-item v-if="widget.value.styleItem==4" :viewModel="viewModel" :count="widget.value.count"></mount-item>
    <general-item v-if="widget.value.styleItem==5" :viewModel="viewModel" :count="widget.value.count"></general-item>
    <growing-item v-if="widget.value.styleItem==6" :viewModel="viewModel" :count="widget.value.count"></growing-item>
    <introduce-item v-if="widget.value.styleItem==7" :viewModel="viewModel" :count="widget.value.count"></introduce-item>
    <member-item v-if="widget.value.styleItem==8" :viewModel="viewModel" :count="widget.value.count"></member-item>
    <ratio-item v-if="widget.value.styleItem==9" :viewModel="viewModel"></ratio-item>
    <states-item v-if="widget.value.styleItem==10" :viewModel="viewModel" :count="widget.value.count"></states-item>
    <total-item v-if="widget.value.styleItem==11" :viewModel="viewModel" :count="widget.value.count"></total-item>
    <omit-item :viewModel="viewModel" v-if="widget.value.styleItem ==12" :count="widget.value.count"></omit-item>
  </div>
</template>

<script>

  import numberItem from './items/01-number-item.vue'
  import tabsItem from './items/02-tabs-item.vue'
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
        viewModel: [],
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
        var singleData = this.widget.value
        if (singleData && singleData.singleReportForm) {
          singleData.singleReportForm.forEach(async (element, index) => {
            var localDataReports = this.$api.vuexLocalGet('single_data_reports')
            if (!localDataReports) {
              localDataReports = []
            }
            var isRequest = true
            var find = localDataReports.find(r => r.id === element.id)
            console.info('find', find)
            if (find && find.time > Math.round(new Date().getTime() / 1000)) {
              isRequest = false
            }
            if (isRequest === true) {
              localDataReports = localDataReports.filter(r => r.id !== element.id)
              var response = await this.$api.httpPost('/api/Report/GetSingleReport', element.dataCouse)
              if (response.status === 1) {
                var data = {
                  name: element.name,
                  id: element.id,
                  value: response.result,
                  icon: element.icon,
                  bgcolor: element.bgColor,
                  color: element.color,
                  intro: element.intro,
                  time: Math.round(new Date(new Date().getTime() + 600000) / 1000) // 保存10分钟后的时间
                }
                console.info('data', data)
                this.viewModel.push(data)
                localDataReports.push(data)
                this.$api.vuexLocalSet('single_data_reports', localDataReports)
              }
            }
          })
        }
        this.widget.value.styleItem = 1
        console.info('this.viewModel', this.viewModel)
        this.async = true
      }
    }
  }
</script>
