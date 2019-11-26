<template>
  <div class="v-right-menu" :style="positionStyle" v-if="async">
    <ul>
      <li class="v-right-menu-list"></li>
    </ul>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        async: false,
        positionStyle: null,
        list: [
          {
            name: '置顶',
            icon: 'el-icon-upload2'
          },
          {
            name: '置低',
            icon: 'el-icon-download'
          },
           {
            name: '锁定',
            icon: 'el-icon-download'
          },
           {
            name: '置低',
            icon: 'el-icon-download'
          }
        ]
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init (ev) {
        // this.positionStyle = `top: ${ev.clientY}px; left:${ev.clientX}px`
        this.async = true
        // 全局监听点击事件
        // window.addEventListener('click', () => {
        //   this.async = false
        // }, true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-right-menu {
    position: fixed;
    width: 110px;
    height: 370px;
    background: #27343e;
    top: 10px;
    left: 10px;
    .v-right-menu-list {
      height: 30px;
      cursor: pointer;
      display: flex;
    }
  }
</style>
