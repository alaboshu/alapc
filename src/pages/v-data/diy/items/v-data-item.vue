
<template>
  <vuedraggable>
    <div class="diy-widget-wrap" @contextmenu="contextmenu($event,widget)" @click="selectWidget(widget)">
      <component v-if="widget.border.show" :is="widget.border.name" :docWidth="widget.resizeLayout.w+widget.border.width" :docHeight="widget.resizeLayout.h+widget.border.width">
        <component :is="widget.name" :widget="widget" :title="widget.title" :style="widget.style.styleCss" />
      </component>
      <component v-else :is="widget.name" :widget="widget" :title="widget.title" :style="widget.style.styleCss" />
      <div class="diy-dottedbox" />
      <div class="diy-masker" v-if="showChecked" />
      <div class="diy-widget-actions">
        <span class="diy-widget-actions-span">{{widget.title}}({{widget.name}})</span>
      </div>
      <v-right-menu ref="vRightMenu" @meuRightClick="meuRightClick" :removeIndex="removeIndex" :scale="scale" :style="'transform: scale('+scale+');'"></v-right-menu>
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
      meuRightClick (data) {
        const { widget, type, removeIndex } = data
        switch (type) {
          case 'dataSource':
            this.editWidget(widget) // 数据源
            break
          case 'delete':
            if (!widget.isLock) {
              this.removeWidget(widget, removeIndex) // 删除模块
            }
            break
          case 'lock':
            this.lockOrUnLockWidget(widget) // 锁定与解锁
            break
          case 'up':
            this.sortWidget(widget, type, removeIndex) // 上一层
            break
          case 'down':
            this.sortWidget(widget, type, removeIndex) // 下一层
            break
          case 'bottom':
            this.sortWidget(widget, type, removeIndex) // 置底
            break
          case 'top':
            this.sortWidget(widget, type, removeIndex) // 置顶
            break
        }
      },
      //  选择模块
      selectWidget (widget) {
        let value = {
          widget: widget,
          index: this.removeIndex.widgetIndex
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
      // 层次移动
      sortWidget (widget, type, removeIndex) {
        this.$emit('sortWidget', widget, type, removeIndex)
      },
      editWidget (widget) {
        this.$emit('editWidget', widget)
      },
      // 鼠标右键事件
      contextmenu (ev, widget) {
        ev.preventDefault()
        this.$refs.vRightMenu.init(ev, widget)
      }
    }
  }

</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  @import "./item.scss";
</style>
