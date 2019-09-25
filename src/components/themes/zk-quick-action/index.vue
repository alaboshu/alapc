<template>
  <div class="zk-quick-action">
    <tab-item v-if="widget.value.styleItem===1" :widget="widget.value.reportValues"></tab-item>
    <rank-item v-if="widget.value.styleItem===2" :widget="widget.value.reportValues"></rank-item>
    <guide-item v-if="widget.value.styleItem===3" :widget="widget.value.reportValues"></guide-item>
    <common-item v-if="widget.value.styleItem===4" :widget="widget.value.reportValues"></common-item>
    <recommend-item v-if="widget.value.styleItem===5" :widget="widget.value.reportValues"></recommend-item>
    <exchange-item v-if="widget.value.styleItem===6" :widget="widget.value.reportValues" :count="widget.value.count"></exchange-item>
    <more-item v-if="widget.value.styleItem===7" :widget="widget.value.reportValues"></more-item>
    <adcolumn-item v-if="widget.value.styleItem===8" :widget="widget.value.reportValues"></adcolumn-item>
  </div>
</template>

<script>

  import tabItem from './items/tab-item'
  import rankItem from './items/rank-item'
  import guideItem from './items/guide-item'
  import commonItem from './items/common-item'
  import recommendItem from './items/recommend-item'
  import exchangeItem from './items/exchange-item'
  import moreItem from './items/more-item'
  import adcolumnItem from './items/adcolumn-item'
  import './var.scss'

  export default {

    components: {
      tabItem,
      rankItem,
      guideItem,
      commonItem,
      recommendItem,
      exchangeItem,
      moreItem,
      adcolumnItem
    },
    data () {
      return {
        widgetModel: {}
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
      }
    }
  }
</script>
