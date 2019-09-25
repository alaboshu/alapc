<template>
  <div class="member-item">
    <div class="col-xl-4">
      <div class="m-widget1">
        <div class="m-widget1__item" v-for="(item,index) in widgetModel" :key="index">
          <div class="row m-row--no-padding align-items-center">
            <div class="col">
              <h3 class="m-widget1__title">{{item.name}}</h3>
              <span class="m-widget1__desc">{{item.intro}}</span>
            </div>
            <div class="col m--align-right">
              <span class="m-widget1__number m--font-brand" :style="{color:item.color}">{{item.value}}</span>
            </div>
          </div>
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

