
<template>
  <div class="diy-widget-wrap">
    <component v-if="widget.border.show" :is="widget.border.name" :docWidth="widget.resizeLayout.w+widget.border.width" :docHeight="widget.resizeLayout.h+widget.border.width">
      <component :is="widget.name" :widget="widget" :title="widget.title" :style="widget.style.styleCss" />
    </component>
    <component v-else :is="widget.name" :widget="widget" :title="widget.title" :style="widget.style.styleCss" />
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      widget: {},
      scale: {}
    },
    mounted () {
    },
    methods: {

    }
  }

</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  @import "./item.scss";
</style>
