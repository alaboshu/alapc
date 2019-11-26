<template>
  <div>
    <v-decoration></v-decoration>
    <!-- <div style="background-image: url(http://retail_v13.api.5ug.com//wwwroot/uploads/api/375-431-798/2019-11-23/5dd900acf00ad91a38998b52.png);"> asfasdf </div> -->
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
</style>
