
<template>
  <vuedraggable>
    <div class="diy-widget-wrap" @click.stop="handleCheck(widget)" @contextmenu="$easycm($event,$root)">
      <component v-if="widget.border.show" :is="widget.border.name" :docWidth="widget.resizeLayout.w+widget.border.width" :docHeight="widget.resizeLayout.h+widget.border.width">
        <component :is="widget.name" :widget="widget" :title="widget.title" :style="widget.style.styleCss" />
      </component>
      <component v-else :is="widget.name" :widget="widget" :title="widget.title" :style="widget.style.styleCss" />
      <div class="diy-dottedbox" />
      <div class="redact-buttom" @click="editWidget(widget)" :style="'transform: scale('+scale+')'">设置数据源</div>
      <div class="diy-masker" v-if="showChecked" />
      <div class="diy-widget-actions" :style="'transform: scale('+scale+')'">
        <span class="diy-widget-actions-span">{{widget.title}}({{widget.name}})</span>
        <span class="diy-widget-actions-span" @click="editWidget(widget)">编辑</span>
        <span class="diy-widget-actions-span" @click="removeWidget(widget,removeIndex)">删除</span>
      </div>
      <easy-cm v-if="offset" :list="contextMenus" :offset="offset" :itemWidth="120" @ecmcb="rightClick" :style="'transform: scale('+scale+')'" :underline="true" :arrow="true">
      </easy-cm>
    </div>
  </vuedraggable>
</template>
<script>
  import vuedraggable from 'vuedraggable'
  import contextMenuJson from './contextMenu.json'
  export default {
    components: {
      vuedraggable
    },
    data () {
      return {
        showChecked: false,
        offset: {
          x: 6,
          y: 10
        },
        contextMenus: {} // 右键菜单  参考文档：https://github.com/boenfu/vue-easycm
      }
    },
    props: {
      widget: {},
      scale: {},
      removeIndex: {}
    },
    mounted () {
      this.contextMenus = contextMenuJson
      this.$set(this.offset, 'x', 6 / this.scale)
      this.$set(this.offset, 'y', 10 / this.scale)
    },
    methods: {
      // 回调函数
      rightClick (indexList) {
        console.info('offset', this.offset, this.scale)
        switch (indexList[0]) {
          case 0:
            console.log('立即播放')
            break
          case 1:
            console.log('下一首播放')
            break
        }
      },
      handleCheck (widget) {
        let value = {
          widget: widget,
          index: this.removeIndex
        }
        this.$emit('handleCheck', value)
      },
      removeWidget (widget, removeIndex) {
        let removeData = {
          widget: widget,
          removeIndex: removeIndex.widgetIndex
        }
        this.$emit('removeWidget', removeData)
      },
      editWidget (widget) {
        this.$emit('editWidget', widget)
      }
    }
  }

</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  @import "./item.scss";
</style>
