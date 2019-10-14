<template>
  <x-border ref="xBorder" icon="flaticon-settings">
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
          this.$refs.xBorder.init(dataResult.border)
        })
      },
      // 表格加载完成事件
      afterTableLoad (dataResult) {
        console.info('dataResult', dataResult)
        this.$nextTick(() => {
          this.$refs.xBorder.init(dataResult.border)
        })
      },
      watchWidget (val) {
        // console.info('重新出发', this.widget)
        // this.type = null
        // this.init()
        // this.$nextTick(() => {
        //   this.$refs.xTable.init(this.type)
        // })
      }
    },
    watch: {
      // 2019年10月14日 注释发现重复出发bug
      //  $route: 'watchWidget'
    }
  }
</script>
