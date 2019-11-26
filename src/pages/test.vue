<template>
  <!-- <div id="app" @contextmenu="$easycm($event,$root)" style="border:1px solid red; width:500px;height:500px;">
    <easy-cm :list="cmList" @ecmcb="test" :underline="true" :arrow="true">
    </easy-cm>
  </div> -->
  <div>
    <div class="app" @contextmenu="contextmenu" style="border:1px solid red; width:500px;height:500px;"></div>
    <vvvv ref="vRightMenu"></vvvv>
  </div>
</template>
<script>
  import vvvv from './diy/v-data/v-right-menu.vue'
  export default {
    name: 'app',
    components: {
      vvvv
    },
    data () {
      return {
        // 配置数组
        cmList: [{
          text: 'Play Now',
          icon: 'iconfont icon-bofang'
        }, {
          text: 'Play Next',
          icon: 'iconfont icon-xiayishou'
        }, {
          text: 'More',
          children: [{
            text: 'Download',
            children: []
          }, {
            text: 'Report'
          }, {
            text: 'Other',
            icon: 'iconfont icon-bofang',
            children: [{
              text: 'Other-1'
            }, {
              text: 'Other-2'
            }, {
              text: 'Other-3'
            }]
          }]
        }]
      }
    },
    methods: {
      // 回调函数
      test (indexList) {
        switch (indexList[0]) {
          case 0:
            console.log('立即播放')
            break
          case 1:
            console.log('下一首播放')
            break
        }
      },
      contextmenu (ev) {
        ev.preventDefault()
        this.$refs.vRightMenu.init(ev)
      }
    }
  }
</script>
