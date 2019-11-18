<template>
  <div class="states-item">
    <div class="m-widget25">
      <span class="m-widget25__price m--font-brand">$237,650</span>
      <span class="m-widget25__desc">Total Revenue This Month</span>
      <div class="m-widget25--progress">
        <div class="m-widget25__progress" v-for="(item,index) in widgetModel" :key="index">
          <!-- <span class="m-widget25__progress-number">
            {{item.name}}
          </span>
          <div class="m--space-10"></div>
          <div class="progress m-progress--sm">
            <div class="progress-bar m--bg-danger" role="progressbar" :style="{width: item.value.condition.value+'%;',background:item.color}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <span class="m-widget25__progress-sub">
            {{item.intro}}必须不能保存云
          </span> -->
          <form-item :widget="item" type="states-item" :widgetModel="widgetModel"></form-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import formItem from './widget/form-item'
  export default {
    components: {
      formItem
    },
    data () {
      return {
        widgetModel: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      console.info('8')
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
