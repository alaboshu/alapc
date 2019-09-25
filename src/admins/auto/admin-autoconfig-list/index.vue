<template>
  <x-border ref="xBorder">
    <x-table :type="type" v-if="type" ref="xTable" @afterTableLoad="afterTableLoad"></x-table>
  </x-border>
</template>

<script>
  import './var.scss'
  import './styles'
  export default {
    data () {
      return {
        type: null
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
        this.type = this.$crud.getType()
        if (!this.type) {
          this.$admin.message('网址输入不正确，autoconfig请输入相关的key')
        }
        this.$nextTick(() => {
          var dataResult = this.$refs.xTable.dataResult
          this.$refs.xBorder.changeStyle(dataResult.name, dataResult.icon)
        })
      },
      // 表格加载完成事件
      afterTableLoad (dataResult) {
        this.$nextTick(() => {
          this.$refs.xBorder.changeStyle(dataResult.name, dataResult.icon)
        })
      },
      watchWidget (val) {
        this.type = null
        this.init()
        this.$nextTick(() => {
          this.$refs.xTable.init(this.type)
        })
      }
    },
    watch: {
      $route: 'watchWidget'
    }
  }
</script>
