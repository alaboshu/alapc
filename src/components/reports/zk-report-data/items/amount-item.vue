<template>
  <div class="amount-item">
    <el-row :span="24">
      <el-col v-for="(item,index) in widgetModel" :key="index" :md="span" :xs="12" :sm="12">
        <div class="item">
          <div>
            <h5 class="count" :style="{color:item.color}">{{item.name}}</h5>
            <span class="splitLine" />
            <p class="title">{{item.intro}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
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
