<template>
  <x-border :title="title" v-if="viewModel">
    <zk-qrcode-list :viewModel="viewModel"></zk-qrcode-list>
    <el-pagination @current-change="currentChange" :page-size="viewModel.pageSize" layout="prev, pager, next" :total="viewModel.pageCount*viewModel.pageSize">
    </el-pagination>
  </x-border>
</template>
<script>
  export default {
    props: {
      widgetData: {},
      title: {}
    },
    data () {
      return {
        async: false,
        viewModel: null,
        pageIndex: 1
      }
    },

    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.async = false
        var par = {
          userId: this.$user.loginUser().id,
          pageIndex: this.pageIndex
        }
        var response = await this.$api.httpGet('Api/Qrcode/QrcodeList', par)
        this.viewModel = response.result
      },
      getPath () {
        this.init()
      },
      currentChange (val) {
        this.pageIndex = val
        this.init()
      }
    },
    watch: {
      '$route': 'getPath'
    }
  }
</script>

<style  lang="scss" scoped>
  .el-pagination {
    float: right;
    margin-top: 10px;
    margin-right: 3%;
  }
</style>


