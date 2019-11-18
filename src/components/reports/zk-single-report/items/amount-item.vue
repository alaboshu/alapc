<template>
  <div class="amount-item">
    <div>
      <div v-for="(item,index) in widgetModel" :key="index" :style="'width:'+100/count+'%;'+'display: inline-block;'">
        <!-- <div class="item">
          <div>
            <h5 class="count" :style="{color:item.color}">{{item.name}}</h5>
            <span class="splitLine" />
            <p class="title">{{item.intro}}</p>
          </div>
        </div> -->
        <form-item :widget="item" type="amount-item" :widgetModel="widgetModel"></form-item>
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
      console.info('1')
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
