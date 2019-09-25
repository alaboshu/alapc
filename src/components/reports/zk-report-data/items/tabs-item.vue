<template>
  <div class="tabs-item">
    <el-row :span="24">
      <el-col :md="span" :xs="24" :sm="12" v-for="(item,index) in widgetModel" :key="index">
        <div class="item" :style="{background:item.color}">
          <div>
            <div class="item-header">
              <p>{{item.name}}</p>
            </div>
            <div class="item-body">
            </div>
            <div class="item-footer">
              <span>{{item.subValue}}</span>
              <p>{{item.intro}}</p>
            </div>
            <p class="item-tip">
              <i class="icon iconfont" :class="item.icon"></i>
            </p>
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
        span: 8
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
