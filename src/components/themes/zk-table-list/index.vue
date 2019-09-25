<template>
  <div id="a">
    <div class="zk-table-list">
      <el-row :gutter="20" style="width:95%;margin:0 auto">
        <el-col :span="4" v-for="(item, index) in viewModel" :key="index">
          <div class="grid-content bg-purple">
            <a :href="item.url"> <img :src="'https://s-open.qiniuniu99.com'+item.imageUrl" style="width:100%;height:130px"></a>
            <h2 class="table_title">{{item.title}}</h2>
            <!-- <p class="table_intro">{{item.intro}}</p> -->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        widgetModel: {},
        list: []
      }
    },
    props: {
      widget: {},
      viewModel: {}
    },
    mounted () {
      // this.init()
    },
    methods: {
      async init () {
        var type = this.$crud.getType()
        var para = {
          type: type
        }
        var result = await this.$api.httpGet('/api/auto/news', para)
        this.list = result.result.resultList
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>

