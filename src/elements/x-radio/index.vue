<template>
  <el-radio-group v-model="viewModel" v-if="keyValues">
    <el-radio v-for="(item,index) in keyValues" :key="index" :label="item.key">{{item.value}}</el-radio>
  </el-radio-group>
</template>
<script>
  import type from '@/service/api/type.api.js'
  export default {
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      type: {},
      apiUrl: {}, // Api网址，优先从Api中获取数据
      dataModel: {}
    },
    data () {
      return {
        keyValues: null,
        viewModel: 0
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.keyValues === null) {
          this.keyValues = await type.getKeyValues(this.type, this.apiUrl)
        }
        this.viewModel = this.dataModel
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          this.$emit('change', this.viewModel)
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .x-radio {
    .el-radio {
      padding: 8px 0px;
    }
    .el-radio__label {
      font-size: 13px;
      color: #575962;
    }
  }
</style>
