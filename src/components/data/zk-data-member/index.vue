<template>
  <div class="zk-data-member">
    <div class="col-xl-4">
      <div class="m-widget1">
        <div class="m-widget1__item" v-for="(item,index) in widgetModel" :key="index">
          <div class="row m-row--no-padding align-items-center">
            <div class="col">
              <h3 class="m-widget1__title">{{item.title}}</h3>
              <span class="m-widget1__desc">{{item.text}}</span>
            </div>
            <div class="col m--align-right">
              <span class="m-widget1__number m--font-brand" :style="{color:item.color}">{{item.mount}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
  // import dataJson from './data.json'
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
<style lang="scss">
  @import "./index.scss";
</style>
