<template>
  <div class="v-right-menu" :style="positionStyle" v-if="async">
    <ul>
      <li class="v-right-menu-list" v-for="(item, index) in list" :key="index">
        <div class="vRight-icon">
          <i :class="item.icon"></i>
        </div>
        <div class="test">{{item.text}}</div>
      </li>
    </ul>
  </div>
</template>


<script>
  import contextMenuJson from './contextMenu.json'
  export default {
    props: {
      scale: {}
    },
    data () {
      return {
        async: false,
        positionStyle: null,
        list: contextMenuJson,
        menuIndex: ''
      }
    },
    mounted () {
      // 全局监听右键事件
      window.addEventListener('contextmenu', () => {
        this.async = false
      }, true)
    },
    methods: {
      init (ev) {
        this.positionStyle = `top: ${ev.clientY * this.scale}px; left:${(ev.clientX * this.scale)}px`
        this.async = true
        // 全局监听点击事件
        window.addEventListener('click', () => {
          this.async = false
        }, true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-right-menu {
    position: fixed;
    width: 110px;
    background: #27343e;
    top: 10px;
    left: 10px;
    .v-right-menu-list {
      height: 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: #bcc9d4;
      .vRight-icon {
        width: 16px;
        height: 16px;
        margin-left: 10px;
        i {
          font-size: 16px;
        }
      }
      .test {
        margin-left: 5px;
      }
      &.active,
      &:hover {
        background-color: #1d262e;
        color: #2483ff;
      }
    }
  }
</style>
