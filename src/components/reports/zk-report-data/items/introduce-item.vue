<template>
  <div class="introduce-item">
    <div class="m-portlet__body">
      <div class="m-widget12">
        <div class="m-widget12__item" v-for="(item,index) in widgetModel" :key="index">
          <span class="m-widget12__text1">{{item.name}}<br><span>{{item.value}}</span></span>
          <span class="m-widget12__text2">{{item.intro}}<br><span>{{item.subValue}}</span></span>
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
