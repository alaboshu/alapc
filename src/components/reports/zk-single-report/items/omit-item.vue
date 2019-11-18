<template>
  <div class="omit-item">
    <div class="omit-item_list" :style="'width:'+100/3+'%;'" v-for="(item,index) in viewModel" :key="index">
      <div class="omit-item_list-box">
        <div class="omit-item_left">
          <div class="omit-item_title">{{item.name}}</div>
          <div class="omit-item_intro">{{item.intro}}</div>
        </div>
        <div class="omit-item_right" :style="'color:'+item.fontColor+';'">{{item.count}}</div>
      </div>
      <!-- <form-item :widget="item" type="omit-item" :widgetModel="viewModel"></form-item> -->
    </div>
  </div>
</template>
<script>
  // import formItem from './widget/form-item'
  export default {
    components: {
      // formItem
    },
    data () {
      return {
        widgetModel: '',
        span: 6
      }
    },
    props: {
      viewModel: {},
      count: {
        default: 3
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
