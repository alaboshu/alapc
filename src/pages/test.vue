<template>
  <div v-if="async" class="v-data-container">
    <div v-for="(widget,index) in viewModel.widgets" :key="index" :style="{left: widget.layout.x + 'px', top: widget.layout.y + 'px', zIndex: viewModel.widgets.length - index,width: widget.layout.w+'px', height:  widget.layout.h+'px'}" :class="widget.border?widget.border.class:''+ '   '+ widget.blockList" class="v-data-widget">
      <v-border-1>
        <component :is="widget.name" :widget="widget" :widgetData="widget" :title="widget.title" ref="childComponent" />
      </v-border-1>
    </div>
  </div>
</template>
<script>
  import theme from '@/service/core/theme'
  export default {
    data () {
      return {
        viewModel: null,
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var pageInfo = await theme.getPageInfo('/admin/user/index', 'admin')
        if (pageInfo === undefined || pageInfo === null) {
          return
        }
        pageInfo = theme.filerPageInfo(pageInfo)
        this.viewModel = pageInfo
        this.viewModel.widgets.forEach((r, index) => {
          r.layout = {
            w: 500,
            h: 500,
            x: (index + 1) * 10,
            y: (index + 1) * 100,
            i: index
          }
          console.info('widget', r, index)
        })
        console.info('this.viewModel', this.viewModel)
        this.async = true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .v-data-container {
    position: absolute;
    .v-data-widget {
      position: absolute;
    }
  }
</style>
