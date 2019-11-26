<template>
  <div v-if="async" class="v-data-container" :style="pageSetting.style">
    <div v-for="(widget,index) in viewModel.widgets" :key="index" :style="{zIndex: viewModel.widgets.length - index}" class="v-data-widget">
      <vue-draggable-resizable @dragging="onDragging(arguments, widget,index)" @resizing="resizeData(arguments, widget,index)" :i="1" :x="widget.resizeLayout.x" :y="widget.resizeLayout.y" :w="widget.resizeLayout.w" :h="widget.resizeLayout.h">
        <data-item :widget="widget" :scale="scaleWidget" @lockOrUnLockWidget="lockOrUnLockWidget" @sortWidget="sortWidget" @removeWidget="removeWidget" @editWidget="editWidget" @selectWidget="selectWidget" :removeIndex="{'widgetIndex':index}"></data-item>
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
        scaleWidget: 1, // 模块还原比例
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
        var style = `width:${this.pageSetting.width}px;height:${this.pageSetting.height}px;`
        style += `background-image:url("${this.pageSetting.bgImage}"); background-color: ${this.pageSetting.bgColor};transform: scale(${data.scale}); transform-origin: left top;`
        this.scaleWidget = 1 / data.scale
        this.$set(this.pageSetting, 'style', style)
      },
      postMessage (type, data) {
        parent.postMessage({ type, data }, '*')
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
      // 编辑
      editWidget (widget) {
        this.postMessage('editWidget', widget)
      },
      // 锁定或解锁模块
      lockOrUnLockWidget (widget) {
        this.postMessage('lockOrUnLockWidget', widget)
      },
      // 排序，置顶、上次，下一层等操作
      sortWidget (widget, type) {
        var data = {
          widget: widget,
          type: type
        }
        this.postMessage('sortWidget', data)
      },
      // 点击模块生效
      selectWidget (value) {
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
