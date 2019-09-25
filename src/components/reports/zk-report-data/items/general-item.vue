<template>
  <div class="general-item">
    <el-row :span="24">
      <template v-for="(item,index) in widgetModel">
        <el-col :xs="12" :sm="6" :md="span" :key="index">
          <div>
            <div class="item" :class="[{'item--easy':discount}]">
              <div class="general-item-icon" :style="{color:item.color}">
                <!-- <i class="icon iconfont" :class="item.icon"></i> -->
                <i class="el-icon-news"></i>
              </div>
              <div class="item-info">
                <span>{{item.name}}</span>
                <div class="count" :style="{color:item.color}">{{item.intro}}</div>
              </div>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        widgetModel: '',
        span: 4,
        color: 'rgb(63, 161, 255)',
        discount: false
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

