
<template>
  <vuedraggable>
    <div class="diy-widget-wrap" @click.stop="selectWidget(widget)" @contextmenu="showMenuIndex = removeIndex,contextmenu($event,removeIndex)">
      <component v-if="widget.border.show" :is="widget.border.name" :docWidth="widget.resizeLayout.w+widget.border.width" :docHeight="widget.resizeLayout.h+widget.border.width">
        <component :is="widget.name" :widget="widget" :title="widget.title" :style="widget.style.styleCss" />
      </component>
      <component v-else :is="widget.name" :widget="widget" :title="widget.title" :style="widget.style.styleCss" />
      <div class="diy-dottedbox" />
      <div class="diy-masker" v-if="showChecked" />
      <div class="diy-widget-actions">
        <span class="diy-widget-actions-span">{{widget.title}}({{widget.name}})</span>
      </div>
      <v-right-menu ref="vRightMenu" :scale="scale" :style="'transform: scale('+scale+');'"></v-right-menu>
    </div>
  </vuedraggable>
</template>
<script>
  import vuedraggable from 'vuedraggable'
  import contextMenuJson from './contextMenu.json'
  import vRightMenu from './v-right-menu'
  export default {
    components: {
      vuedraggable,
      vRightMenu
    },
    data () {
      return {
        showChecked: false,
        offset: {
          x: 6,
          y: 10
        },
        contextMenus: {}// 右键菜单  参考文档：https://github.com/boenfu/vue-easycm
      }
    },
    props: {
      widget: {},
      scale: {},
      removeIndex: {}
    },
    // ;transform: scale(${data.scale});
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
            this.sortWidget(this.widget, 'top', this.removeIndex) // 置顶
            break
          case 2:
            this.sortWidget(this.widget, 'up', this.removeIndex) // 上一层
            break
          case 3:
            this.sortWidget(this.widget, 'down', this.removeIndex) // 下一层
            break
          case 4:
            this.sortWidget(this.widget, 'bottom', this.removeIndex) // 置底
            break
          case 5:
            this.lockOrUnLockWidget(this.widget)
            break
          case 6:
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
      // 锁定或解锁模块
      lockOrUnLockWidget (widget) {
        this.$emit('lockOrUnLockWidget', widget)
      },
      // 锁定或解锁模块
      sortWidget (widget, type) {
        this.$emit('sortWidget', widget, type)
      },
      editWidget (widget) {
        this.$emit('editWidget', widget)
      },
      // 鼠标右键事件
      contextmenu (ev, removeIndex) {
        ev.preventDefault()
        this.$refs.vRightMenu.init(ev, removeIndex.widgetIndex)
      }
    }
  }

</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  @import "./item.scss";
</style>
