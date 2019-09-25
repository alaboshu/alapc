<template>
  <div class="ratio-item">
    <div class="data-progress">
      <div class="data-progress_list" v-for="(item,index) in widgetModel" :key="index" :style="'width:'+100/count+'%;'+'display: inline-block;'">
        <!-- <div class="item">
          <div>
            <div class="item-header">
              <div class="item-count" v-text="item.value+'%'"></div>
              <div class="item-title" v-text="item.name"></div>
            </div>
            <el-progress :stroke-width="8" :percentage="item.value.condition.value" :color="item.color" :show-text="false">
            </el-progress>
          </div>
        </div> -->
        <form-item :widget="item" :widgetModel="widgetModel" type="ratio-item"></form-item>
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
        widgetModel: '',
        span: 6
      }
    },
    props: {
      widget: {},
      count: {
        default: 4
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
