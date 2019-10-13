<template>
  <i :class="' icon iconfont '+xClass +' '+ name" :style="'font-size:'+size+'px;color:'+color"></i>
</template>

<script>
  // 只支持icon相关图标,不支持elemenUI图标
  export default {
    name: 'x-icon',
    props: {
      xClass: {
        type: String,
        default: ''
      },
      color: {},
      size: {
        type: Number,
        default: 20
      },
      name: {
        type: String
      }
    },
    mounted () {
      this.init()
    },
    data () {
      return {
      }
    },
    methods: {
      init () {
        console.info('name', this.name)
      }
    }
  }
</script>
