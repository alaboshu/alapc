
<template>
  <vuedraggable>
    <div class="diy-widget-wrap" @click.stop="handleCheck(widget)">
      <component v-if="widget.style.border&&widget.style.border.show" :is="widget.style.border.name" :docWidth="widget.resizeLayout.w+widget.style.border.width" :docHeight="widget.resizeLayout.h+widget.style.border.width">
        <component :is="widget.name" :widget="widget" :title="widget.title" />
      </component>
      <component v-else :is="widget.name" :widget="widget" :title="widget.title" />
      <div class="diy-dottedbox" />
      <div class="redact-buttom" @click="editWidget(widget)">设置数据源</div>
      <div class="diy-masker" v-if="showChecked" />
      <div class="diy-widget-actions">
        <span class="diy-widget-actions-span">{{widget.title}}({{widget.name}})</span>
        <span class="diy-widget-actions-span" @click="editWidget(widget)">编辑</span>
        <span class="diy-widget-actions-span" @click="removeWidget(widget,removeIndex)">删除</span>
      </div>
    </div>
  </vuedraggable>
</template>
<script>
  import vuedraggable from 'vuedraggable'
  export default {
    components: {
      vuedraggable
    },
    data () {
      return {
        showChecked: false
      }
    },
    props: {
      widget: {},
      removeIndex: {}
    },
    mounted () {
    },
    methods: {
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
