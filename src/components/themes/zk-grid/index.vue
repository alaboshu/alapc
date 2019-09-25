<template>
  <div class="zk-grid">
    <div class="weui-grids">
      <router-link :to="item.Url" class="weui-grid" v-for="(item,index) in viewModel" :key="index" :style="'width:'+100/col+'%'">
        <div class="weui-grid__icon">
          <x-icon :src="item.Image" :xClass="iconClass"></x-icon>
        </div>
        <p class="weui-grid__label">{{item.Name}}</p>
      </router-link>
    </div>
    <div class="zk-grid_bottom" v-if="disknone!=true"></div>
  </div>
</template>

<script>
  
  export default {
    
    data () {
      return {
        widgetModel: '',
        zkgridtrue: true
      }
    },
    props: {
      widget: {},
      col: {
        default: 4
      },
      disknone: {}
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        if (this.widgetModel.widgetId === 'e00001ec2500000b0005ee64' || this.widgetModel.widgetId === 'e00001ec2500000b0002ba29' || this.widgetModel.widgetId === 'e00001ec2500000b0000dd3f') {
          this.zkgridtrue = false
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "~_style/index.scss";
  .zk-grid_bottom {
    width: 100%;
    height: 10px;
    background-color: #f8f8f8;
  }
  .weui-grid {
    text-decoration: none;
    color: $gl-brand;
    width: 25%;
    padding: 10px 10px;
    .weui-grid__icon {
      margin: 0 auto;
    }
  }
  .weui-cell:visited {
    color: #000;
  }
  .weui-grid__label {
    text-decoration: none;
    color: #000;
  }
  .weui-grid {
    padding: 9px 10px;
  }
  .weui-grid:before {
    border: none;
  }
  .weui-grid::after {
    border: none;
  }
  .weui-grid:hover {
    color: $gl-brand !important;
  }
</style>
