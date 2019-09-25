<template>
  <div class="general-item">
    <div>
      <div v-for="(item,index) in widgetModel" :key="index" :style="'width:'+100/count+'%;'+'display: inline-block;'">
        <!-- <div>
          <div class="item" :class="[{'item--easy':discount}]">
            <div class="general-item-icon" :style="{color:item.color}">
              <i class="icon iconfont" :class="item.icon.name"></i>
            </div>
            <div class="item-info">
              <span>{{item.name}}</span>
              <div class="count" :style="{color:item.color}">{{item.intro}}</div>
            </div>
          </div>
        </div> -->
        <form-item :widget="item" type="general-item" :widgetModel="widgetModel"></form-item>
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
        span: 4,
        color: 'rgb(63, 161, 255)',
        discount: false
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

