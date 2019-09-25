<template>
  <div class="h5-x-clear" element-path="h5/x-clear">
    {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-clear',
    props: {
      elementData: {}
    },
    data () {
      return {
        viewModel: ''
      }
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.elementData !== undefined) {
          this.viewModel = this.elementData
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~_style/index.scss";
  .h5-x-clear {
    font-size: $gl-size-base;
  }
</style>
