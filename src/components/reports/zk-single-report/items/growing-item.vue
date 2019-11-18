<template>
  <div class="growing-item">
    <div class="row m-row--no-padding m-row--col-separator-xl">
      <div class="m-widget24" v-for="(item,index) in widgetModel" :key="index" :style="'width:'+100/count+'%;'">
        <!-- <div class="m-widget24__item">
          <h4 class="m-widget24__titles">
            {{item.name}}
          </h4><br>
          <span class="m-widget24__desc">
            {{item.intro}}
          </span>
          <span class="m-widget24__stats m--font-brand" :style="{color:item.fontColor}">
            ￥<single-value :widget="item.value.condition.value" :color="item.fontColor" :size="20" :fontWeight="600"></single-value>
          </span>
          <div class="m--space-10"></div>
          <div class="progress m-progress--sm">
            <div class="progress-bar m--bg-brand" :style="'width:'+(item.subValue.condition.value/item.value.condition.value)*100+'%;'+'background:'+item.color+';'"></div>
          </div>
          <div class="numerical-value">
            <div class="numerical-value_text">已使用{{item.subValue.condition.value}}元</div>
            <div class="m-widget24__numbers" v-if="item.subValue.condition.value!=0&&item.value.condition.value!=0">
              {{(item.subValue.condition.value/item.value.condition.value*100).toFixed(2)}}%
            </div>
            <div class="m-widget24__numbers" v-else>
              0.00%
            </div>
          </div>
        </div> -->
        <form-item :widget="item" type="general-item" :widgetModel="widgetModel"></form-item>
      </div>
    </div>
  </div>
</template>
<script>
  // import singleValue from '../single-value.vue'
  import formItem from './widget/form-item'
  export default {
    components: {
      // singleValue,
      formItem
    },
    data () {
      return {
        widgetModel: ''
      }
    },
    props: {
      widget: {},
      count: {
        default: 4
      }
    },
    mounted () {
      console.info('3')
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

