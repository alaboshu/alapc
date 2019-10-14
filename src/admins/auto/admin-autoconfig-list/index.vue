<template>
  <x-border ref="xBorder" icon="flaticon-settings">
    <x-table :type="type" v-if="type" :isShowPage="false" ref="xTable" @afterTableLoad="afterTableLoad"></x-table>
  </x-border>
</template>

<script>
  import './var.scss'
  import './styles'
  export default {
    data () {
      return {
        type: null,
        firstLoad: true // 首次加载
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
        this.firstLoad = false
      },
      // 表格加载完成事件
      afterTableLoad (dataResult) {
        this.$nextTick(() => {
          this.$refs.xBorder.init(dataResult.border)
        })
      },
      watchRoute (val) {
        if (this.firstLoad === true) {
          return // 第一次加载，不监听路由，防止二次触发
        }
        if (this.$base.router().path !== '/Admin/AutoConfig/List') {
          return // 调转到其他页面时，不执行
        }
        this.init()
        this.$nextTick(() => {
          this.$refs.xTable.init(this.type)
        })
      }
    },
    watch: {
      $route: 'watchRoute'
    }
  }
</script>
