<template>
  <el-checkbox-group v-model="viewModel" :min="min" :max="max">
    <el-checkbox v-for="(item,index) in keyValues" :key="index" :label="item.key">{{item.value}}</el-checkbox>
  </el-checkbox-group>
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
      min: {
        default: 0
      },
      max: {
        default: 0
      },
      apiUrl: {}, // Api网址，优先从Api中获取数据
      dataModel: {}
    },
    data () {
      return {
        keyValues: null,
        viewModel: []
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
</style>

