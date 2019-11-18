<template>
  <div class="ratio-item">
    <div class="data-progress">
      <div class="data-progress_list" v-for="(item,index) in viewModel" :key="index" :style="'width:'+100/count+'%;'+'display: inline-block;'">
        <div class="item">
          <div>
            <div class="item-header">
              <div class="item-count" v-text="item.count+'%'"></div>
              <div class="item-title" v-text="item.name"></div>
            </div>
            <!-- :percentage.sync="item.count" -->
            <el-progress :stroke-width="8" :percentage="50" :color="item.color" :show-text="false">
            </el-progress>
          </div>
        </div>
      </div>
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
      viewModel: {},
      count: {
        default: 4
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
