<template>
  <div v-if="async" class="v-data-container">
    <div v-for="(widget,index) in viewModel.widgets" :key="index" :style="{left: widget.layout.x + 'px', top: widget.layout.y + 'px', zIndex: viewModel.widgets.length - index,width: widget.layout.w+'px', height:  widget.layout.h+'px'}" :class="widget.border?widget.border.class:''+ '   '+ widget.blockList" class="v-data-widget">
      <template v-if="widget.status !== 'small'">
        <div v-if="widget.border&& widget.border.show===true">
          <div class="border-header">
            <x-icon class="border-header-icon" :color="widget.border.fontColor" v-if="widget.border.icon" :icon="widget.border.icon"></x-icon>
            <div class="border-header-title" :style="'color:'+widget.border.fontColor">{{widget.border.title}}</div>
            <div class="border-header-desc" :style="'color:'+widget.border.fontColor">{{widget.border.intro}}</div>
            <div class="border-header-tools"></div>
          </div>
          <div class="border-body">
            <component :is="widget.name" :widget="widget" :widgetData="widget" :title="widget.title" ref="childComponent" />
          </div>
        </div>
        <component v-else :is="widget.name" :widget="widget" :widgetData="widget" :title="widget.title" ref="childComponent" />
      </template>
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
