<template>
  <div>
    <div v-for="item in viewModel" :key="item">
      {{item.id}}--- {{item.value}}<br />
    </div>
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
    .v-data-widget {
      position: absolute;
    }
  }
</style>
