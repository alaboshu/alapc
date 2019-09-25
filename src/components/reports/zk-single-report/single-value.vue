<template>
  <div class="single-value" v-if="async">
    <el-button :loading="loadingSave">
      <span :style="'color:'+color+';'+'font-size:'+size+'px;'+'font-weight:'+fontWeight+';'">{{widget}}</span>
    </el-button>
  </div>
</template>
<script>
  export default {
    props: {
      widget: {},
      color: {},
      size: {
        default: 12
      },
      fontWeight: {
        default: 400
      }
    },
    data () {
      return {
        loadingSave: false,
        viewModel: '',
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.loadingSave = true
        this.viewModel = this.widget
        var than = this
        setTimeout(function () {
          than.loadingSave = false
        }, 1000)
        this.async = true
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .single-value {
    display: inline-block;
    .el-button {
      background-color: #ffffff;
      color: #333333;
      padding: 0px;
    }
  }
</style>
