<template>
  <div>
    <x-select-image v-model="viewModel" :count="6"></x-select-image>
    {{viewModel}}
  </div>

</template>
<script>
  export default {
    data () {
      return {
        viewModel: null
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
