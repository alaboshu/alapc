<template>
  <i v-if="async" :class="' icon iconfont '+xClass +' '+ viewModel.name" :style="'font-size:'+viewModel.size+'px;color:'+viewModel.color"></i>
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
        type: [String, Number],
        default: '20'
      },
      // 直接传图标对象
      icon: {},
      name: {
        type: String
      }
    },
    mounted () {
      this.init()
    },
    data () {
      return {
        viewModel: {},
        async: false
      }
    },
    methods: {
      init () {
        if (this.icon) {
          this.viewModel = this.icon
        }
        if (this.name) {
          this.viewModel.name = this.name
        }
        if (this.size) {
          this.viewModel.size = this.size
        }
        if (this.viewModel.color) {
          this.viewModel.color = this.color
        }

        this.async = true
      },
      // 修改Icon数据
      changeIcon (icon, size) {
        this.async = false
        if (icon !== undefined && icon !== null) {
          this.viewModel.name = icon.name
          this.viewModel.size = icon.size
          this.viewModel.color = icon.color
        } else {
          this.viewModel.name = null
        }
        if (size !== undefined && size !== null) {
          this.viewModel.size = size
        }
        this.async = true
      }
    }
  }
</script>
