<template>
  <div class="omit-item">
    <div class="omit-item_list" :style="'width:'+100/3+'%;'" v-for="(item,index) in widgetModel" :key="index">
      <!-- <div class="omit-item_list-box">
        <div class="omit-item_left">
          <div class="omit-item_title">{{item.name}}</div>
          <div class="omit-item_intro">{{item.intro}}</div>
        </div>
        <div class="omit-item_right" :style="'color:'+item.fontColor+';'">{{item.value.condition.value}}</div>
      </div> -->
      <form-item :widget="item" type="omit-item" :widgetModel="widgetModel"></form-item>
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
        widgetModel: '',
        span: 6
      }
    },
    props: {
      widget: {},
      count: {
        default: 3
      }
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
