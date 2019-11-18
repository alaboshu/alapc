<template>
  <div class="member-item">
    <div class="col-xl-4">
      <div class="m-widget1">
        <div class="m-widget1__item" v-for="(item,index) in viewModel" :key="index" :style="'background:'+item.bgcolor">
          <div class="row m-row--no-padding align-items-center">
            <div class="col">
              <h3 class="m-widget1__title">{{item.name}}</h3>
              <span class="m-widget1__desc">{{item.account}}</span>
            </div>
            <div class="col m--align-right">
              <span class="m-widget1__number m--font-brand" :style="{color:item.color}">{{item.count}}</span>
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
      viewModel: {}
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>

