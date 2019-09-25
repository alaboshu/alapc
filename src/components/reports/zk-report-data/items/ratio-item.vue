<template>
  <div class="ratio-item">
    <div class="data-progress">
      <el-row :span="24">
        <el-col :md="span" :xs="24" :sm="12" v-for="(item,index) in widgetModel" :key="index">
          <div class="item">
            <div>
              <div class="item-header">
                <div class="item-count" v-text="item.value+'%'"></div>
                <div class="item-title" v-text="item.name"></div>
              </div>
              <el-progress :stroke-width="8" :percentage="item.value" :color="item.color" :show-text="false">
              </el-progress>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        widgetModel: '',
        span: 6
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
