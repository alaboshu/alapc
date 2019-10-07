
<template>
  <div class="border01">
    <div class="widget-header" :style="{background:backGroundColor}" v-if="headType">
      <span class="more"></span>
      <h3 class="widget-header-title" :style="{color:fontColor}">
        <i class="iconver iconfont glyph-icon" :class="Icon" v-if="iconShow" :style="{color:fontColor}"></i>
        <x-icon class="iconver" :src="iconType.path" v-else></x-icon>
        {{borderTitle}}
        <div class="widget-header-desc">短信、营销、客群维护等</div>
      </h3>

      <div class="header-right">
        <slot name="borderFooter"></slot>
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
  import service from './service'
  export default {
    data () {
      return {
        Icon: null,
        backGroundColor: '#ffffff',
        fontColor: '#575962',
        iconShow: true,
        borderTitle: null
      }
    },
    props: {
      title: {
        default: null
      },
      color: {
        default: null
      },
      icon: {
        default: null
      },
      headType: {
        default: true
      },
      iconType: {
        default: null
      },
      bgColor: {
        default: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      // 修改标题，图标和颜色
      changeStyle (title, icon, color) {
        this.borderTitle = null
        this.backGroundColor = '#ffffff'
        this.fontColor = '#575962'
        this.Icon = null
        this.iconShow = true
        if (title && !this.borderTitle) {
          this.borderTitle = title
        }
        if (icon) {
          this.Icon = icon
        }
        if (color) {
          this.convert(color)
        }
        if (!this.Icon && this.$base.filter() === 3) {
          this.Icon = service.getAdminIcon()
        }
      },
      async init () {
        if (this.iconType === null) {
          this.iconShow = true
          if (!this.icon) {
            this.Icon = this.$random.icon()
          } else {
            this.Icon = this.icon
          }
        } else {
          this.iconShow = false
        }
        if (this.title) {
          this.borderTitle = this.title
        }
        if (!this.$api.isEmpty(this.color)) {
          this.convert(this.color)
        }
      },
      convert (colorType) {
        if (colorType === 'brand') {
          this.backGroundColor = '#716aca'
          this.fontColor = '#ffffff'
        } else if (colorType === 'info') {
          this.backGroundColor = '#36a3f7'
          this.fontColor = '#ffffff'
        } else if (colorType === 'metal') {
          this.backGroundColor = '#575962'
          this.fontColor = '#ffffff'
        } else if (colorType === 'primary') {
          this.backGroundColor = '#5867dd'
          this.fontColor = '#ffffff'
        } else if (colorType === 'success') {
          this.backGroundColor = '#34bfa3'
          this.fontColor = '#ffffff'
        } else if (colorType === 'warning') {
          this.backGroundColor = '#ffb822'
          this.fontColor = '#ffffff'
        } else if (colorType === 'focus') {
          this.backGroundColor = '#9816f4'
          this.fontColor = '#ffffff'
        } else if (colorType === 'accent') {
          this.backGroundColor = '#00c5dc'
          this.fontColor = '#ffffff'
        } else if (colorType === 'danger') {
          this.backGroundColor = '#f4516c'
          this.fontColor = '#ffffff'
        } else if (colorType === 'light') {
          this.backGroundColor = '#ffffff'
          this.fontColor = '#575962'
        } else {
          // this.fontColor = this.color
          this.fontColor = '#575962'
          this.backGroundColor = this.bgColor
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "~_style_all/theme.scss";
  @import "./border01.scss";
</style>
