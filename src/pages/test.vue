<template>
  <div>
    <zk-file-manage></zk-file-manage>
    <x-select-image v-model="viewModel"></x-select-image>
    {{viewModel}}
  </div>

</template>
<script>
  export default {
    data () {
      return {
        viewModel: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
