<template>
  <div class="growing-item">
    <div class="row m-row--no-padding m-row--col-separator-xl">
      <div class="m-widget24" v-for="(item,index) in widgetModel" :key="index">
        <div class="m-widget24__item">
          <h4 class="m-widget24__title">
            {{item.name}}
          </h4><br>
          <span class="m-widget24__desc">
            {{item.intro}}
          </span>
          <span class="m-widget24__stats m--font-brand" :style="{color:item.color}">
            {{item.value}}
          </span>
          <div class="m--space-10"></div>
          <div class="progress m-progress--sm">
            <div class="progress-bar m--bg-brand" role="progressbar" :style="{width: item.rate ,background:item.color}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <span class="m-widget24__number">
            {{item.subValue}}%
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
      widget: {}
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

