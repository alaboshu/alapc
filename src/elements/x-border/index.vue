
<template>
  <div class="x-border">
    <div class="widget-header" :style="{background:backGroundColor}">
      <span class="more"></span>
      <h3 class="widget-header-title" :style="{color:fontColor}">
        <x-icon class="iconver" :name="borderIcon" :color="fontColor"></x-icon>
        {{borderTitle}}
        <div class="widget-header-desc" v-if="description">{{description}}</div>
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
  import service from './service'
  export default {
    data () {
      return {
        borderIcon: null,
        backGroundColor: '#ffffff',
        fontColor: '#575962',
        description: null,
        borderTitle: null
      }
    },
    props: {
      title: {
        default: null
      },
      desc: {
        default: null
      },
      color: {
        default: null
      },
      icon: {
        default: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      // 修改标题，图标和颜色
      changeStyle (title, icon, color, desc) {
        this.borderTitle = null
        this.backGroundColor = '#ffffff'
        this.fontColor = '#575962'
        this.borderIcon = null
        this.iconShow = true
        if (title && !this.borderTitle) {
          this.borderTitle = title
        }
        if (icon) {
          this.borderIcon = icon
        }
        if (color) {
          this.convert(color)
        }
        if (!this.borderIcon && this.$base.filter() === 3) {
          this.borderIcon = service.getAdminborderIcon()
        }
        this.description = desc
      },
      async init () {
        if (this.iconType === null) {
          this.iconShow = true
          if (!this.icon) {
            this.borderIcon = this.$random.icon()
          } else {
            this.borderIcon = this.icon
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
        this.description = this.desc
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
  @import "./style.scss";
</style>
