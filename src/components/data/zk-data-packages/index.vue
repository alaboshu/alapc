<template>
  <div class="zk-data-packages">
    <div class="col-xl-4">
      <div class="m-portlet m--bg-warning m-portlet--bordered-semi m-portlet--full-height " v-for="(item,index) in widgetModel" :key="index">
        <div class="m-portlet__head">
          <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
              <h3 class="m-portlet__head-text m--font-light">
                {{item.title}}
              </h3>
            </div>
          </div>
        </div>
        <div class="m-portlet__body">
          <div class="m-widget29">
            <div class="m-widget_content" v-for="(citem,cindex) in item.listContent" :key="cindex">
              <h3 class="m-widget_content-title">{{citem.title}}</h3>
              <div class="m-widget_content-items">
                <div class="m-widget_content-item" v-for="(sitem,sindex) in citem.list" :key="sindex">
                  <span>{{sitem.title}}</span>
                  <span class="m--font-accent" :style="{color:sitem.color}">{{sitem.conText}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
<style  lang="scss" scoped>
  @import "./index.scss";
</style>
