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
        var isRequset = true
        if (singleData && singleData.singleReportForm) {
          singleData.singleReportForm.forEach(async (element, index) => {
            var localData = this.$api.localGet('single_data_' + element.id)
            if (localData) {
              isRequset = this.compareTime(localData.time)
              if (!isRequset) {
                this.viewModel.push(localData)
              }
            }
            if (isRequset) {
              var response = await this.$api.httpPost('/api/Report/GetSingleReport', element.dataCouse)
              if (response.status === 1) {
                var data = {
                  name: element.account,
                  id: element.id,
                  count: response.result,
                  icon: element.icon,
                  bgcolor: element.bgColor,
                  color: element.color,
                  account: element.account
                }
                data.time = this.getDate()
                this.$api.localSet('single_data_' + element.id, data)
                this.viewModel.push(data)
              }
            }
          })
        }
        this.async = true
      },
      getDate () {
        var date = new Date()
        var years = date.getFullYear()
        var mounth = date.getMonth()
        var day = date.getDate()
        var hours = date.getHours()
        var minutes = date.getMinutes()
        return years + '-' + (mounth + 1) + '-' + day + ' ' + hours + ':' + minutes
      },
      compareTime (localTime) {
        // 比较双方时间是否超过十分钟，最大范围到天
        var nowTimeDay = this.getDate().split('-')[2].split(' ')[0]
        var nowTimeHouers = this.getDate().split(' ')[1].split(':')[0]
        var nowTimeMinutes = this.getDate().split(' ')[1].split(':')[1]
        var localDay = localTime.split('-')[2].split(' ')[0]
        var localHouers = localTime.split(' ')[1].split(':')[0]
        var localMinutes = localTime.split(' ')[1].split(':')[1]
        // 天数，小时相等比较分钟
        if (nowTimeDay === localDay && nowTimeHouers === localHouers) {
          if (nowTimeMinutes - localMinutes > 10) {
            return true
          }
          // 天数，相等小时不一样折算小时为分钟
        } else if (nowTimeDay === localDay && nowTimeHouers !== localHouers) {
          var exceedHouers = (nowTimeHouers - localHouers) * 60
          nowTimeMinutes += exceedHouers
          if (nowTimeMinutes - localMinutes > 10) {
            return true
          }
          // 天数不想等
        } else if (nowTimeDay !== localDay) {
          return true
        }
        return false
      }
    }
  }
</script>
