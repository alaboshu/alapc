<template>
  <div class="zk-qrcode-list">
    <el-row :gutter="20" style="width:95%;margin:0 auto">
      <el-col :span="4" v-for="(item, index) in viewModel.result" :key="index">
        <div class="grid-content bg-purple">
          <a :href="'https://s-open.qiniuniu99.com'+item.imageUrl"> <img :src="'https://s-open.qiniuniu99.com'+item.imageUrl" style="width:100%;height: 280px;"></a>
          <h2 class="table_title">{{item.title}}</h2>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import './var.scss'


  export default {
    name: 'zk-qrcode-list',
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
      }
    }
  }
</script>

