<template>
  <admin-layout :isDiy="true" :eidtTabBar="eidtTabBar" :widgetModel="widgetModel" @editWidget="editWidget"></admin-layout>
</template>
<script>
  export default {
    data () {
      return {
        viewModel: {
          widgets: [],
          setting: {
            showFoot: false
          }
        },
        widgetModel: ''
      }
    },
    mounted () {
      this.initListener()
      this.postMessage('clientIframeLoadRequest', 'admin-layout')
      // 监听diy体系中，点击菜单，并跳转到相应的页面
      this.$bus.$on('diyEditMenuJump', (url) => {
        this.postMessage('diyEditMenuJump', url)
      })
    },
    methods: {
      initListener () {
        window.addEventListener('message', (event) => {
          const { type, data } = event.data || {}
          switch (type) {
            case 'initWidget':
              this.initWidget(data)
              break
            case 'sideMenu':
              this.sideMenu(data)
              break
          }
        })
      },
      postMessage (type, data) {
        parent.postMessage({ type, data }, '*')
      },
      editWidget (widget) {
        this.postMessage('editWidget', widget)
      },
      eidtTabBar () {
        var widget = {
          name: 'zk-tabbar',
          widgetId: '5c7b08e3a1355908e48cf4f3'
        }
        this.postMessage('editWidget', widget)
      },
      initWidget (data) {
        this.$bus.$emit('global_diy_menus', data)
        this.widgetModel = data
      },
      sideMenu (data) {
        console.info('sss,global_diy_menusglobal_diy_menusglobal_diy_menus')
        this.$bus.$emit('global_diy_menus', data)
      }
    }
  }
</script>
