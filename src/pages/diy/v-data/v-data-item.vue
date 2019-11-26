
<template>
  <vuedraggable>
    <div class="diy-widget-wrap" @click.stop="selectWidget(widget)" @contextmenu="$easycm($event,$root)">
      <component v-if="widget.border.show" :is="widget.border.name" :docWidth="widget.resizeLayout.w+widget.border.width" :docHeight="widget.resizeLayout.h+widget.border.width">
        <component :is="widget.name" :widget="widget" :title="widget.title" :style="widget.style.styleCss" />
      </component>
      <component v-else :is="widget.name" :widget="widget" :title="widget.title" :style="widget.style.styleCss" />
      <div class="diy-dottedbox" />
      <div class="diy-masker" v-if="showChecked" />
      <div class="diy-widget-actions">
        <span class="diy-widget-actions-span">{{widget.title}}({{widget.name}})</span>
      </div>
      <easy-cm v-if="offset" :list="contextMenus" :offset="offset" :itemWidth="100" :itemSize="12" @ecmcb="rightClick" :style="'transform: scale('+scale+')'" :underline="true" :arrow="true">
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
        switch (indexList[0]) {
          case 0:
            this.editWidget(this.widget)
            break
          case 1:
            console.log('上一层')
            break
          case 2:
            console.log('下一层')
            break
          case 3:
            console.log('锁定/解锁')
            break
          case 4:
            this.removeWidget(this.widget, this.removeIndex)
            break
        }
      },
      //  选择模块
      selectWidget (widget) {
        let value = {
          widget: widget,
          index: this.removeIndex
        }
        this.$emit('selectWidget', value)
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
