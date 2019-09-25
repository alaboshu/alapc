<template>
  <div class="total-item">
    <div class="m-portlet__body">
      <div class="m-widget4">
        <div class="m-widget4__item" v-for="(item ,index) in widgetModel" :key="index">
          <!-- <div class="m-widget4__ext">
            <span class="m-widget4__icon m--font-brand">
              <i class="icon iconfont" :class="item.icon"></i>
            </span>
          </div>
          <div class="m-widget4__info">
            <span class="m-widget4__text">
              {{item.name}}
            </span>
          </div>
          <div class="m-widget4__ext">
            <span class="m-widget4__number m--font-info">
              {{item.value.condition.value}}
            </span>
          </div> -->
          <form-item :widget="item" type="total-item" :widgetModel="widgetModel"></form-item>
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
