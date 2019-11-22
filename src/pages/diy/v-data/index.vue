<template>
  <div class="vdata_index">
    <vuedraggable element="div" class="vdata_class" :options="{group:'people', ghostClass: 'ghost'}" @add="handleWidgetAdd($event)" @end="dragend($event)" :move="handleMove">
      就是你了a
    </vuedraggable>
  </div>
</template>

<script>
  import vuedraggable from 'vuedraggable'
  export default {
    components: {
      vuedraggable
    },
    data () {
      return {}
    },
    mounted () {
    },
    methods: {
      handleWidgetAdd (ev) {
        console.info('拖拽中', ev)
      },
      dragend (ev) {
        console.info('拖拽结束', ev)
      },
      handleMove () {
        return true
      }
    }
  }
</script>


<style lang="scss">
  .vdata_index {
    .vdata_class {
      width: 1000px;
      height: 200px;
      background: yellow;
    }
  }
</style>
