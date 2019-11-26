<template>
  <div v-if="async" class="v-data-container" :style="pageSetting.style">
    <div v-for="(widget,index) in viewModel.widgets" :key="index" :style="{left: widget.resizeLayout.x + 'px', top: widget.resizeLayout.y + 'px',width: widget.resizeLayout.w+'px', height:  widget.resizeLayout.h+'px', zIndex: viewModel.widgets.length - index}" class="v-data-widget">
      <vue-draggable-resizable @dragging="onDragging(arguments, widget,index)" @resizing="resizeData(arguments, widget,index)" :x="widget.resizeLayout.x" :y="widget.resizeLayout.y" :w="widget.resizeLayout.w" :h="widget.resizeLayout.h">
        <data-item :widget="widget" @removeWidget="removeWidget" @editWidget="editWidget" @handleCheck="handleCheck" :removeIndex="{'widgetIndex':index}"></data-item>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>

  import service from './service'
  import dataItem from './v-data-item'
  export default {
    components: {
      dataItem
    },
    data () {
      return {
        async: false,
        widgetItem: '',
        pageSetting: {},
        viewModel: []
      }
    },
    mounted () {
      this.initListener()
      this.postMessage('clientIframeLoadRequest', 'alapc')
    },
    methods: {
      async initWidget (data) {
        this.pageSet(data)
        this.viewModel = service.convertTo(data)
        this.async = true
        this.postMessage('clientIframeLoadSuccessful', true)
      },
      // 设置页面背景或颜色
      async pageSet (data) {
        if (data.setting && data.setting.tabBarSetting) {
          this.pageSetting = JSON.parse(data.setting.tabBarSetting)
        }
        var style = `background-image:url("${this.pageSetting.bgImage}"); background-color: ${this.pageSetting.bgColor};`
        this.$set(this.pageSetting, 'style', style)
      },
      postMessage (type, data) {
        parent.postMessage({ type, data }, '*')
      },
      // 动态修改样式
      getStyle (widget) {
        var css = widget.resizeLayout
        var boxCss = `width: ${css.w}px; height: ${css.h}px;`
        if (widget.style && widget.style.css) {
          var modelCss = JSON.parse(widget.style.css)
          var bgCss = `background: ${modelCss.bgColor} url(${modelCss.bgImage}) no-repeat`
        }
        return boxCss + bgCss
      },
      initListener () {
        window.addEventListener('message', (event) => {
          const { type, data } = event.data || {}
          switch (type) {
            case 'initWidget':
              this.initWidget(data)
              break
            case 'removeWidget':
              this.removeWidgetAndSave(data)
              break
            case 'widgetList':
              this.widgetList()
              break
          }
        })
      },
      // 保存事件
      widgetList () {
        this.postMessage('widgetList', this.viewModel.widgets)
      },
      onDragging (data, widget, index) {
        widget.resizeLayout.x = data[0]
        widget.resizeLayout.y = data[1]
        this.postMessage('v-data-layout-real-time-sync', widget, index)
      },
      resizeData (data, widget, index) {
        widget.resizeLayout.x = data[0]
        widget.resizeLayout.y = data[1]
        widget.resizeLayout.w = data[2]
        widget.resizeLayout.h = data[3]
        this.postMessage('v-data-layout-real-time-sync', widget, index)
      },
      // 删除
      removeWidget (removeData) {
        this.postMessage('deleteWidgetAndSave', removeData)
      },
      // 删除容器或者模块
      removeWidgetAndSave (removeData) {
        if (typeof (removeData) === 'number') {
          this.viewModel.widgets.splice(removeData, 1)
        }
        if (typeof (removeData) === 'object') {
          if (typeof (removeData.removeIndex) === 'number') {
            this.viewModel.widgets.splice(removeData.removeIndex, 1)
          } else {
            this.auxiliaryRemove = false
            this.viewModel.widgets[removeData.removeIndex.widgetIndex].columns[removeData.removeIndex.tablayout].widgets.splice(removeData.removeIndex.tabWidgetIndex, 1)
            this.auxiliaryRemove = true
          }
        }
        // 配置大数据屏幕时的删除功能
        this.postMessage('v-data_save')
      },
      // 编辑
      editWidget (widget) {
        this.postMessage('editWidget', widget)
      },
      // 点击模块生效
      handleCheck (value) {
        this.$bus.$emit('layoutItemCheck', value.index)
        this.postMessage('selectWidget', value.widget, value.index)
      }
    }
  }
</script>


<style lang="scss">
  .v-data-container {
    width: 100%;
    height: 100%;
    position: absolute;
    .v-data-widget {
      width: 100%;
      position: absolute;
      cursor: pointer;
    }
  }
</style>
