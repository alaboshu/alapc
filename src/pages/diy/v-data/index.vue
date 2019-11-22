<template>
  <div class="vdata_index">
    <div v-if="async" class="v-data-container">
      <!-- ,width: widget.layout.w+'px', height:  widget.layout.h+'px' -->
      <div v-for="(widget,index) in viewModel.widgets" :key="index" :style="{left: widget.layout.x + 'px', top: widget.layout.y + 'px', zIndex: viewModel.widgets.length - index}" :class="widget.border?widget.border.class:''+ '   '+ widget.blockList" class="v-data-widget">
        <template v-if="widget.status !== 'small'">
          <vue-draggable-resizable @dragging="onDragging(arguments, widget)" @resizing="resiziData(arguments, widget)" :w="widget.layout.w" :h="widget.layout.h">
            <data-item :widget="widget" @removeWidget="removeWidget" @editWidget="editWidget" @handleCheck="handleCheck" :removeIndex="{'widgetIndex':index,'tablayout':index,'tabWidgetIndex':index}"></data-item>
          </vue-draggable-resizable>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import theme from '@/service/core/theme'
  import dataItem from './v-data-item'
  export default {
    components: {
      dataItem
    },
    data () {
      return {
        async: false,
        widgetItem: '',
        viewModel: []
      }
    },
    mounted () {
      this.initListener()
      this.postMessage('clientIframeLoadRequest', 'wfsbpc')
    },
    methods: {
      async initWidget (data) {
        this.viewModel = {
          ...data,
          masterPageIndex: this.masterPageIndex
        }
        this.viewModel = theme.filerPageInfo(this.viewModel)
        console.info('weism ', this.viewModel)
        if (this.viewModel && this.viewModel.widgets) {
          for (let i of this.viewModel.widgets) {
            if (!i.layout) {
              var para = {
                y: 500,
                x: 500,
                w: 500,
                h: 500
              }
              i.layout = para
            }
          }
        }
        this.async = true
        this.postMessage('clientIframeLoadSuccessful', true)
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
        console.info('进来不', this.viewModel.widgets)
        for (let i of this.viewModel.widgets) {
          if (i.layout) {
            i.layout = null
          }
        }
        this.postMessage('widgetList', this.viewModel.widgets)
      },
      onDragging (data, widget) {
        var para = {
          x: data[0],
          y: data[1],
          widget
        }
        this.postMessage('v-data-mouse-axis', para)
      },
      resiziData (data, widget) {
        var para = {
          x: data[0],
          y: data[1],
          width: data[2],
          height: data[3],
          widget
        }
        this.postMessage('v-data-mouse-axis', para)
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
        this.postMessage('diySave')
      },
      // 编辑
      editWidget (widget) {
        this.postMessage('editWidget', widget)
      },
      // 点击模块生效
      handleCheck (value) {
        this.$bus.$emit('layoutItemCheck', value.index)
        this.postMessage('selectWidget', value)
      }
    }
  }
</script>


<style lang="scss">
  .v-data-container {
    position: absolute;
    .v-data-widget {
      position: absolute;
    }
  }
</style>
