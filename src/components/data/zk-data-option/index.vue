<template>
  <div class="zk-data-option">
    <div class="m-widget27 m-portlet-fit--sides" v-for="(item,index) in widgetModel" :key="index">
      <div class="m-portlet__head-caption">
        <h3 class="m-portlet__head-text m--font-light">{{item.title}}</h3>
      </div>
      <div class="m-widget27__pic">
        <img src="http://ui.5ug.com/metronic_v5.5.5/theme/default/dist/default/assets/app/media/img/bg/bg-4.jpg" alt>
        <h3 class="m-widget27__title m--font-light">
          <span>
            <span>$</span>
            {{item.mount}}
          </span>
        </h3>
        <div class="m-widget27__btn">
          <button type="button" class="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--bolder">{{item.text}}</button>
        </div>
      </div>
      <div class="m-widget27__container">
        <ul class="m-widget27__nav-items nav nav-pills nav-fill" role="tablist">
          <li class="m-widget27__nav-item nav-item" v-for="(citem,cindex) in item.list" :key="cindex">
            <router-link to="item.href" class="nav-link" data-toggle="pill">{{citem}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  
  import dataJson from './data.json'
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
        this.widgetModel = dataJson
      }
    }
  }
</script>
<style lang="scss">
  @import "./index.scss";
</style>
