<template>
  <div class="mount-item">
    <el-row span="24">
      <el-col class="mount-item_list" :md="span" :xs="24" :sm="12" v-for="(item,index) in widgetModel" :key="index">
        <router-link to="item.href">
          <div class="item">
            <div class="item-icon" :style="{background:item.color}">
              <i class="icon iconfont" :class="item.icon"></i>
            </div>
            <div class="item-info">
              <div class="item-title" :style="{color:item.color}">{{item.name}}</div>
              <span class="item-count">{{item.intro}}</span>
            </div>
          </div>
        </router-link>
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
