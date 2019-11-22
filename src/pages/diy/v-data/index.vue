<template>
  <div class="vdata_index">
    <vue-draggable-resizable :w="100" :h="100">
      <div>付款了第三方反倒是拉福利费</div>
    </vue-draggable-resizable>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        admin: 'fsdfa'
      }
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
    width: 1000px;
    height: 200px;
    background: yellow;
    position: relative;
  }
</style>
