<template>
  <div id="a">
    <div class="zk-table-video-list">
      <el-row :gutter="20" style="width:95%;margin:0 auto">
        <el-col :span="6" v-for="(item, index) in list" :key="index">
          <div class="grid-content bg-purple">
            <video class="edui-upload-video  vjs-default-skin video-js" controls="" preload="none" width="100%" height="240" data-setup="{}" :src="'https://s-open.qiniuniu99.com' +item.source"></video>
            <h2 class="table_title">{{item.title}}</h2>
            <p class="video_intro">{{item.intro}}</p>
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
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var type = this.$crud.getType()
        var para = {
          type: type
        }
        var response = await this.$api.httpGet('/Api/Auto/news', para)
        if (response.status === 1) {
          this.viewModel = response.result
          this.title = this.viewModel.name
        } else {
          this.$alert(response.message, '类型输入错误', {
            confirmButtonText: '确定'
          })
        }
        var result = await this.$api.httpGet('/Api/Auto/news', para)
        this.list = result.result.resultList
      }
    }
  }
</script>
<style  lang="scss" scoped>
  @import "./styles/a.scss";
</style>
