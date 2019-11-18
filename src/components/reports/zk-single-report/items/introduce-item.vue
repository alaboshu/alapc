<template>
  <div class="introduce-item">
    <div class="m-portlet__body">
      <div class="m-widget12">
        <div class="m-widget12__item" v-for="(item,index) in widgetModel" :key="index">
          <form-item :widget="item" type="introduce-item" :widgetModel="widgetModel"></form-item>
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
      console.info('4')
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
