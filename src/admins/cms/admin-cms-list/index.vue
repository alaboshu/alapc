<template>
  <x-border ref="xBorder">
    <x-table type="Article" ref="xTable" @afterTableLoad="afterTableLoad"></x-table>
  </x-border>
</template>

<script>
  import './var.scss'

  export default {
    data () {
      return {
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
        if (this.$route.query.ChannelId === undefined) {
          this.$admin.message('网址输入不正确，cms访问时请输入相关的ChannelId', 'danger')
        }
        var channelResponse = await this.$api.httpGet('api/Channel/ViewById', { Id: this.$route.query.ChannelId })
        if (channelResponse.status === 1) {
          this.$nextTick(() => {
            this.$refs.xBorder.changeStyle(channelResponse.result.name)
          })
        }
      },
      // 表格加载完成事件
      afterTableLoad (dataResult) {
      },
      watchWidget (val) {
        this.init()
        this.$nextTick(() => {
          this.$refs.xTable.init('Article')
        })
      }
    },
    watch: {
      $route: 'watchWidget'
    }
  }
</script>
