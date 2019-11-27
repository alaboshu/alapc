<template>
  <div v-if="async" class="v-data-container" :style="pageSetting.style">
    <div v-for="(widget,index) in viewModel.widgets" :key="index" :style="{zIndex: viewModel.widgets.length - index}" class="v-data-widget">
      <preview-item :widget="widget" :scale="scaleWidget"></preview-item>
    </div>
  </div>
</template>

<script>
  import widgetService from '@/elements/x-widget/service'
  import previewItem from './preview-item'
  import theme from '@/service/core/theme'
  import service from './service'
  export default {
    components: {
      previewItem
    },
    data () {
      return {
        viewModel: {},
        scaleWidget: 1, // 模块还原比例
        pageSetting: {},
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.async = false
        var path = this.$route.query.path
        this.viewModel = await theme.getPageInfo(path, 'admin', this.$route)
        if (!this.viewModel) {
          this.$admin.message('您输入的网址不正确,页面不存在', 'danger', '页面不存在')
        }

        await widgetService.checkAdminRole(this.viewModel)
        this.viewModel = service.convertTo(this.viewModel)
        if (!this.$base.isBuild()) {
          console.info('页面信息:', this.viewModel)
        }
        this.pageSet(this.viewModel)
        this.async = true
      },
      // 设置页面背景或颜色
      async pageSet (data) {
        var style = service.pageSet(data)
        this.scaleWidget = 1 / data.scale
        this.$set(this.pageSetting, 'style', style)
      }
    }
  }
</script>


<style lang="scss">
  @import "./index.scss";
</style>
