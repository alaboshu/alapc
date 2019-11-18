<template>
  <div class="growing-item">
    <div class="row m-row--no-padding m-row--col-separator-xl">
      <div class="m-widget24" v-for="(item,index) in viewModel" :key="index" :style="'width:'+100/count+'%;background:'+item.bgcolor">
        <div class="m-widget24__item">
          <h4 class="m-widget24__titles">
            {{item.name}}
          </h4><br>
          <span class="m-widget24__desc">
            {{item.count}}
          </span>
          <span class="m-widget24__stats m--font-brand" :style="{color:item.color}">
            ￥<single-value :widget="item.count" :color="item.color" :size="20" :fontWeight="600"></single-value>
          </span>
          <div class="m--space-10"></div>
          <div class="progress m-progress--sm">
            <div class="progress-bar m--bg-brand" :style="'width: 25%; background:'+item.color+';'"></div>
          </div>
          <div class="numerical-value">
            <div class="numerical-value_text">已使用{{item.count}}元</div>
            <div class="m-widget24__numbers" v-if="item.count">
              {{(item.count/item.count*100).toFixed(2)}}%
            </div>
            <div class="m-widget24__numbers" v-else>
              0.00%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import singleValue from '../single-value.vue'
  export default {
    components: {
      singleValue
    },
    data () {
      return {
        widgetModel: ''
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

