<template>
  <div class="v-single-data" v-if="async">
    <single-item-1 v-if="widget.value.dataSingleType== 1" :viewModel="viewModel" style="margin: 100px"></single-item-1>
    <single-item-2 v-if="widget.value.dataSingleType== 2" :viewModel="viewModel" style="margin: 100px"></single-item-2>
    <single-item-3 v-if="widget.value.dataSingleType== 3" :viewModel="viewModel" style="margin: 100px"></single-item-3>
    <single-item-4 v-if="widget.value.dataSingleType== 4" :viewModel="viewModel" style="margin: 100px"></single-item-4>
  </div>
</template>

<script>
  import styleItem from './styles/style-item'
  export default {
    mixins: [styleItem],
    props: {
      widget: {}
    },
    data () {
      return {
        widgetModel: {},
        async: false,
        viewModel: [],
        idList: [] // Id顺序排序用
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      // 不请求Api接口
      async init () {
        var singleData = this.widget.value
        var localDataReports = this.$api.vuexLocalGet('data_ringle_report_model')
        if (!localDataReports) {
          localDataReports = []
        }
        if (singleData && singleData.singleReportForm) {
          singleData.singleReportForm.forEach(async (element, index) => {
            this.idList.push(element.id)
            var value = 0
            var isRequest = true
            var find = this.getFind(localDataReports, element.id)
            if (find) {
              value = find.value
              isRequest = false
            }
            var data = this.setdata(element, value)
            data.dataCouse = element.dataCouse
            data.isRequest = isRequest
            if (!isRequest) {
              data.time = find.time
            }
            this.viewModel.push(data)
            localDataReports = localDataReports.filter(r => r.id !== data.id)
            localDataReports.push(data)
          })
        }
        this.viewModel = this.sort(this.viewModel)
        this.$api.vuexLocalSet('data_ringle_report_model', localDataReports)
        this.async = true
        setTimeout(async () => {
          await this.initAfter(localDataReports)
        }, 500)
      },
      // 数据完成以后请求
      async initAfter (localDataReports) {
        this.viewModel.forEach(async (element, index) => {
          if (element.isRequest === true) {
            var response = await this.$api.httpPost('/api/Report/GetSingleReport', element.dataCouse)
            if (response.status === 1) {
              localDataReports = localDataReports.filter(r => r.id !== element.id)
              element.value = response.result
              element.time = Math.round(new Date(new Date().getTime() + 600000) / 1000) // 保存10分钟后的时间
              this.$set(this.viewModel[index], 'value', element.value)
              localDataReports.push(element)
              this.$api.vuexLocalSet('data_ringle_report_model', localDataReports)
            }
          }
        })
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
          if (find) {
            if (find.time > Math.round(new Date().getTime() / 1000)) {
              return find
            }
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
        if (element.time) {
          data.time = element.time
        }
        if (this.$api.isEmpty(data.color)) {
          data.color = '#ffffff'
        }
        return data
      }
    }
  }
</script>
