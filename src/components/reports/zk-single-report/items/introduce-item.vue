<template>
  <div class="introduce-item">
    <div class="m-portlet__body">
      <div class="m-widget12">
        <div class="m-widget12__item" v-for="(item,index) in viewModel" :key="index">
          <span class="m-widget12__text1">{{item.name}}<br><span>{{item.count}}</span></span>
          <span class="m-widget12__text2">{{item.account}}<br><span>{{item.count}}</span></span>
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
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
