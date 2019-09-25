<template>
  <div class="tabs-item">
    <div>
      <div v-for="(item,index) in widgetModel" :key="index" :style="'width:'+100/count+'%;'+'display: inline-block;'">
        <!-- <div class="item" :style="{background:item.color}">
          <div>
            <div class="item-header">
              <p>{{item.name}}</p>
            </div>
            <div class="item-body">
              <span>{{item.value.condition.value}}</span>
            </div>
            <div class="item-footer">
              <span>{{item.subValue.condition.value}}</span>
              <p>{{item.intro}}</p>
            </div>
            <p class="item-tip">
              <i class="icon iconfont" :class="item.icon"></i>
            </p>
          </div>
        </div> -->
        <form-item :widget="item" type="tabs-item" :widgetModel="widgetModel"></form-item>
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
        span: 8
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
