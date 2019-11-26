<template>
  <div class="test">
    <v-single-data></v-single-data>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        viewModel: [
          { id: 1, value: 0 },
          { id: 2, value: 0 },
          { id: 3, value: 0 }
        ],
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        setTimeout(async () => {
          this.$set(this.viewModel[2], 'value', 1000)
        }, 3000)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .v-data-container {
    position: absolute;
    overflow: hidden;
    .v-data-widget {
      position: absolute;
    }
  }
  .test {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #00060e;
  }
</style>
