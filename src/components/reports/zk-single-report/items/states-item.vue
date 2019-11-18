<template>
  <div class="states-item">
    <div class="m-widget25">
      <span class="m-widget25__price m--font-brand">$237,650</span>
      <span class="m-widget25__desc">Total Revenue This Month</span>
      <div class="m-widget25--progress">
        <div class="m-widget25__progress" v-for="(item,index) in viewModel" :key="index">
          <span class="m-widget25__progress-number">
            {{item.name}}
          </span>
          <div class="m--space-10"></div>
          <div class="progress m-progress--sm">
            <div class="progress-bar m--bg-danger" role="progressbar" :style="{width: 25+'%;',background:item.bgcolor}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <span class="m-widget25__progress-sub">
            {{item.account}}必须不能保存云
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        widgetModel: ''
      }
    },
    props: {
      viewModel: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.widgetModel = this.widget
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
