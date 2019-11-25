<template>
  <div>
    <div style="width: 400px; height: 400px">
      <v-border-1></v-border-1>
    </div>
    <div style="height:100px;width:100px;box-sizing:border-sizing;background:#000">
      <v-border-2></v-border-2>
    </div>
    <div style="height:100px;width:100px;box-sizing:border-sizing;background:#000">
      <v-border-3></v-border-3>
    </div>
    <div style="height:100px;width:100px;box-sizing:border-sizing;background:#000">
      <v-border-4></v-border-4>
    </div>
    <div style="height:100px;width:100px;box-sizing:border-sizing;background:#000">
      <v-border-5></v-border-5>
    </div>
    <div style="height:100px;width:100px;box-sizing:border-sizing;background:#000">
      <v-border-6></v-border-6>
    </div>
    <div style="height:100px;width:100px;box-sizing:border-sizing;background:#000">
      <v-border-7></v-border-7>
    </div>
    <div style="height:100px;width:100px;box-sizing:border-sizing;background:#000">
      <v-border-8></v-border-8>
    </div>
    <div style="height:100px;width:100px;box-sizing:border-sizing;background:#000">
      <v-border-9></v-border-9>
    </div>
    <div style="height:100px;width:100px;box-sizing:border-sizing;background:#000">
      <v-border-10></v-border-10>
    </div>
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
