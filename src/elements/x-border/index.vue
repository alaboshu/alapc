
<template>
  <div class="x-border" v-if="async">
    <div class="widget-header" :style="{background:backGroundColor}">
      <span class="more"></span>
      <h3 class="widget-header-title" :style="{color:fontColor}">
        <x-icon class="iconver" :name="viewModel.icon" :color="fontColor"></x-icon>
        {{viewModel.title}}
        <div class="widget-header-desc">{{viewModel.description}}</div>
      </h3>
      <div class="header-right">
        <slot name="headerRight"></slot>
      </div>
    </div>
    <div class="widget-body">
      <slot></slot>
    </div>
    <div class="widget-footer">
      <span></span>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        viewModel: {
          title: '',
          icon: '',
          description: ''
        },
        backGroundColor: '#ffffff',
        fontColor: '#575962',
        async: false
      }
    },
    props: {
      title: {
        default: null
      },
      desc: {
        default: null
      },
      type: {
        type: String,
        validator: function (t) {
          return t === 'metal' || t === 'brand' || t === 'primary' || t === 'success' || t === 'warning' || t === 'focus' || t === 'accent' || t === 'danger' || t === 'light'
        },
        defalut: 'metal'
      },
      icon: {
        // 图标名称
        default: null
      },
      // 图标对象
      border: {}
    },
    mounted () {
      this.init(this.border)
    },
    methods: {
      async init (border) {
        if (this.icon) {
          this.viewModel.icon = this.icon
        }

        if (this.title) {
          this.viewModel.title = this.title
        }
        if (this.desc) {
          this.viewModel.description = this.desc
        }
        if (border) {
          if (border.title) {
            this.viewModel.title = border.title
          }
          if (border.description) {
            this.viewModel.description = border.description
          }
          if (border.icon) {
            if (border.icon.name.includes('fa-') !== -1) {
              this.viewModel.icon = border.icon.name
            }
          }
        }

        if (!this.viewModel.icon) {
          this.viewModel.icon = this.$random.icon()
        }

        var borderType = this.type
        if (border && border.type) {
          borderType = border.type
        }
        this.convert(borderType)
        this.async = true
      },
      convert (type) {
        if (type === 'brand') {
          this.backGroundColor = '#716aca'
          this.fontColor = '#ffffff'
        } else if (type === 'info') {
          this.backGroundColor = '#36a3f7'
          this.fontColor = '#ffffff'
        } else if (type === 'metal') {
          this.backGroundColor = '#575962'
          this.fontColor = '#ffffff'
        } else if (type === 'primary') {
          this.backGroundColor = '#5867dd'
          this.fontColor = '#ffffff'
        } else if (type === 'success') {
          this.backGroundColor = '#34bfa3'
          this.fontColor = '#ffffff'
        } else if (type === 'warning') {
          this.backGroundColor = '#ffb822'
          this.fontColor = '#ffffff'
        } else if (type === 'focus') {
          this.backGroundColor = '#9816f4'
          this.fontColor = '#ffffff'
        } else if (type === 'accent') {
          this.backGroundColor = '#00c5dc'
          this.fontColor = '#ffffff'
        } else if (type === 'danger') {
          this.backGroundColor = '#f4516c'
          this.fontColor = '#ffffff'
        } else if (type === 'light') {
          this.backGroundColor = '#ffffff'
          this.fontColor = '#575962'
        } else {
          this.backGroundColor = '#ffffff'
          this.fontColor = '#575962'
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "~_style_all/theme.scss";
  @import "./style.scss";
</style>
