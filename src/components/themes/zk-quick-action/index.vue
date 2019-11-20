<template>
  <div class="zk-quick-action" style="background: #fff !important;">
    <tab-item v-if="widget.value.quickType==1" :widget="widget.value.quickForm"></tab-item>
    <common-item v-if="widget.value.quickType==2" :widget="widget.value.reportValues"></common-item>
    <recommend-item v-if="widget.value.quickType==3" :widget="widget.value.reportValues"></recommend-item>
    <more-item v-if="widget.value.quickType==4" :widget="widget.value.reportValues"></more-item>
  </div>
</template>

<script>

  import tabItem from './items/01-tab-item'
  import commonItem from './items/02-common-item'
  import recommendItem from './items/03-recommend-item'
  import moreItem from './items/04-more-item'
  import './var.scss'

  export default {

    components: {
      tabItem,
      commonItem,
      recommendItem,
      moreItem
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

<style lang="scss" scoped>
  .zk-quick-action {
    background: #ffffff;
  }
</style>
