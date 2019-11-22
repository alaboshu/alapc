<template>
  <div class="zk-single-report" v-if="async">
    <number-item v-if="widget.value.styleItem==1" :viewModel="viewModel" :count="widget.value.count"></number-item>
    <tabs-item v-if="widget.value.styleItem==2" :viewModel="viewModel" :count="widget.value.count"></tabs-item>
    <omit-item v-if="widget.value.styleItem ==3" :viewModel="viewModel" :count="widget.value.count"></omit-item>
    <mount-item v-if="widget.value.styleItem==4" :viewModel="viewModel" :count="widget.value.count"></mount-item>
    <general-item v-if="widget.value.styleItem==5" :viewModel="viewModel" :count="widget.value.count"></general-item>
    <growing-item v-if="widget.value.styleItem==6" :viewModel="viewModel" :count="widget.value.count"></growing-item>
    <introduce-item v-if="widget.value.styleItem==7" :viewModel="viewModel" :count="widget.value.count"></introduce-item>
    <member-item v-if="widget.value.styleItem==8" :viewModel="viewModel" :count="widget.value.count"></member-item>
    <ratio-item v-if="widget.value.styleItem==9" :viewModel="viewModel"></ratio-item>
    <states-item v-if="widget.value.styleItem==100" :viewModel="viewModel" :count="widget.value.count"></states-item>
    <total-item v-if="widget.value.styleItem==11" :viewModel="viewModel" :count="widget.value.count"></total-item>

    <amount-item v-if="widget.value.styleItem==30" :viewModel="viewModel" :count="widget.value.count"></amount-item>
  </div>
</template>

<script>

  import numberItem from './items/01-number-item.vue'
  import tabsItem from './items/02-tabs-item.vue'
  import mountItem from './items/04-mount-item.vue'
  import omitItem from './items/03-omit-item.vue'
  import amountItem from './items/amount-item.vue'
  import generalItem from './items/general-item.vue'
  import growingItem from './items/growing-item.vue'
  import introduceItem from './items/introduce-item.vue'
  import memberItem from './items/member-item.vue'
  import ratioItem from './items/ratio-item.vue'
  import statesItem from './items/states-item.vue'
  import totalItem from './items/total-item.vue'

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
        idList: [], // Id顺序排序用
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
      // 不请求Api接口
      async init () {
        var singleData = this.widget.value
        var localDataReports = this.$api.vuexLocalGet('single_data_reports')
        if (!localDataReports) {
          localDataReports = []
        }
        if (singleData && singleData.singleReportForm) {
          singleData.singleReportForm.forEach(async (element, index) => {
            this.idList.push(element.id)
            var value = 0
            var find = this.getFind(localDataReports, element.id)
            if (find) {
              value = find.value
            }
            var data = this.setdata(element, value)
            data.dataCouse = element.dataCouse
            this.viewModel.push(data)
          })
        }
        this.viewModel = this.sort(this.viewModel)
        this.async = true
        setTimeout(async () => {
          await this.initAfter()
        }, 500)
      },
      // 数据完成以后请求
      async initAfter () {
        var localDataReports = this.$api.vuexLocalGet('single_data_reports')
        if (!localDataReports) {
          localDataReports = []
        }
        this.viewModel.forEach(async (element, index) => {
          var find = this.getFind(localDataReports, element.id)
          if (!find) {
            localDataReports = localDataReports.filter(r => r.id !== element.id)
            var response = await this.$api.httpPost('/api/Report/GetSingleReport', element.dataCouse)
            if (response.status === 1) {
              element.value = response.result
              element.time = Math.round(new Date(new Date().getTime() + 600000) / 1000) // 保存10分钟后的时间
              this.$set(this.viewModel[index], 'value', element.value)
            }
            localDataReports.push(element)
          }
        })
        this.$api.vuexLocalSet('single_data_reports', localDataReports)
      },
      // 排序
      sort (reportArray) {
        var newArray = []
        this.idList.forEach(element => {
          var dataItem = reportArray.find(r => r.id === element)
          if (dataItem) {
            newArray.push(dataItem)
          }
        })
        return newArray
      },
      // 根据id查找缓存中的元素
      getFind (localReports, id) {
        if (localReports && id) {
          // 读取缓存中的值
          var find = localReports.find(r => r.id === id)
          if (find && find.time > Math.round(new Date().getTime() / 1000)) {
            return find
          }
        }
      },
      // 设置元素值
      setdata (element, value) {
        var data = {
          name: element.name,
          id: element.id,
          value: value,
          icon: element.icon,
          bgcolor: element.bgColor,
          color: element.color,
          intro: element.intro
        }
        if (this.$api.isEmpty(data.color)) {
          data.color = '#ffffff'
        }
        return data
      }
    }
  }
</script>
