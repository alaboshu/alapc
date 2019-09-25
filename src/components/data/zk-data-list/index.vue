<template>
  <div class="zk-data-list">
    <div class="col-xl-4" v-for="(item,index) in widgetModel" :key="index">
      <div class="m-portlet m-portlet--head-overlay m-portlet--full-height   m-portlet--rounded-force">
        <div class="m-portlet__head m-portlet__head--fit">
          <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
              <h3 class="m-portlet__head-text m--font-light">
                {{item.title}}
              </h3>
            </div>
          </div>
        </div>
        <div class="m-portlet__body">
          <div class="m-widget28">
            <div class="m-widget28__pic m-portlet-fit--sides"></div>
            <div class="m-widget28__container">
              <ul class="m-widget28__nav-items nav nav-pills nav-fill" role="tablist">
                <li class="m-widget28__nav-item nav-item" v-for="(citem,cindex) in item.listTile" :key="cindex">
                  <router-link to="#menu11" class="nav-link active" data-toggle="pill">
                    <span>
                      <i class="el-icon-document"></i></span>
                    <span>{{citem.title}}</span>
                  </router-link>
                </li>
              </ul>
              <div class="m-widget28__tab tab-content">
                <div id="menu11" class="m-widget28__tab-container tab-pane active">
                  <div class="m-widget28__tab-items">
                    <div class="m-widget28__tab-item">
                      <span>Company Name</span>
                      <span>SLT Back-end Solutions</span>
                    </div>
                    <div class="m-widget28__tab-item">
                      <span>INE Number</span>
                      <span>D330-1234562546</span>
                    </div>
                    <div class="m-widget28__tab-item">
                      <span>Total Charges</span>
                      <span>USD 1,250.000</span>
                    </div>
                    <div class="m-widget28__tab-item">
                      <span>Project Description</span>
                      <span>Creating Back-end Components</span>
                    </div>
                  </div>
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
<style lang="scss">
  @import "./index.scss";
</style>
